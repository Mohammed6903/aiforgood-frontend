"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Heart, AlertCircle, Phone, Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "emergency" | "normal"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your ThalCare AI assistant. I'm here to help you with blood management, donor coordination, emergency requests, and any questions about thalassemia care. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const audioPlayerNodeRef = useRef<AudioWorkletNode | null>(null)
  const audioPlayerContextRef = useRef<AudioContext | null>(null)
  const audioRecorderNodeRef = useRef<AudioWorkletNode | null>(null)
  const audioRecorderContextRef = useRef<AudioContext | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const audioBufferRef = useRef<Uint8Array[]>([])
  const bufferTimerRef = useRef<NodeJS.Timeout | null>(null)
  const currentMessageIdRef = useRef<string | null>(null)

  const base64ToArray = (base64: string) => {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = ""
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  const convertFloat32ToPCM = (inputData: Float32Array) => {
    const pcm16 = new Int16Array(inputData.length)
    for (let i = 0; i < inputData.length; i++) {
      pcm16[i] = inputData[i] * 0x7fff
    }
    return pcm16.buffer
  }

  const startAudioPlayerWorklet = async () => {
    const audioContext = new AudioContext({ sampleRate: 24000 })
    await audioContext.audioWorklet.addModule("/pcm-player-processor.js")
    const audioPlayerNode = new AudioWorkletNode(audioContext, "pcm-player-processor")
    audioPlayerNode.connect(audioContext.destination)
    return [audioPlayerNode, audioContext] as const
  }

  const startAudioRecorderWorklet = async (audioRecorderHandler: (pcmData: ArrayBuffer) => void) => {
    const audioRecorderContext = new AudioContext({ sampleRate: 16000 })
    await audioRecorderContext.audioWorklet.addModule("/pcm-recorder-processor.js")

    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1 },
    })
    const source = audioRecorderContext.createMediaStreamSource(micStream)

    const audioRecorderNode = new AudioWorkletNode(audioRecorderContext, "pcm-recorder-processor")

    source.connect(audioRecorderNode)
    audioRecorderNode.port.onmessage = (event) => {
      const pcmData = convertFloat32ToPCM(event.data)
      audioRecorderHandler(pcmData)
    }

    return [audioRecorderNode, audioRecorderContext, micStream] as const
  }

  const audioRecorderHandler = (pcmData: ArrayBuffer) => {
    audioBufferRef.current.push(new Uint8Array(pcmData))

    if (!bufferTimerRef.current) {
      bufferTimerRef.current = setInterval(sendBufferedAudio, 200)
    }
  }

  const sendBufferedAudio = () => {
    if (audioBufferRef.current.length === 0) return

    let totalLength = 0
    for (const chunk of audioBufferRef.current) {
      totalLength += chunk.length
    }

    const combinedBuffer = new Uint8Array(totalLength)
    let offset = 0
    for (const chunk of audioBufferRef.current) {
      combinedBuffer.set(chunk, offset)
      offset += chunk.length
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const message = {
        mime_type: "audio/pcm",
        data: arrayBufferToBase64(combinedBuffer.buffer),
      }
      wsRef.current.send(JSON.stringify(message))
      console.log("[CLIENT TO AGENT] sent audio:", combinedBuffer.byteLength, "bytes")
    }

    audioBufferRef.current = []
  }

  const startVoiceConversation = async () => {
    try {
      // Start audio output
      const [playerNode, playerContext] = await startAudioPlayerWorklet()
      audioPlayerNodeRef.current = playerNode
      audioPlayerContextRef.current = playerContext

      // Start audio input
      const [recorderNode, recorderContext, micStream] = await startAudioRecorderWorklet(audioRecorderHandler)
      audioRecorderNodeRef.current = recorderNode
      audioRecorderContextRef.current = recorderContext
      micStreamRef.current = micStream

      setIsVoiceEnabled(true)
      setIsRecording(true)

      // Reconnect WebSocket with audio mode
      if (wsRef.current) {
        wsRef.current.close()
      }
      connectWebSocket(true)
    } catch (error) {
      console.error("Error starting voice conversation:", error)
    }
  }

  const stopVoiceConversation = () => {
    setIsRecording(false)
    setIsVoiceEnabled(false)

    if (bufferTimerRef.current) {
      clearInterval(bufferTimerRef.current)
      bufferTimerRef.current = null
    }

    if (audioBufferRef.current.length > 0) {
      sendBufferedAudio()
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop())
    }

    if (audioPlayerContextRef.current) {
      audioPlayerContextRef.current.close()
    }

    if (audioRecorderContextRef.current) {
      audioRecorderContextRef.current.close()
    }

    // Reconnect WebSocket without audio mode
    if (wsRef.current) {
      wsRef.current.close()
    }
    connectWebSocket(false)
  }

  const toggleMute = () => {
    if (audioPlayerNodeRef.current) {
      if (isMuted) {
        audioPlayerNodeRef.current.connect(audioPlayerContextRef.current!.destination)
      } else {
        audioPlayerNodeRef.current.disconnect()
      }
      setIsMuted(!isMuted)
    }
  }

  const connectWebSocket = (audioMode = false) => {
    const userId = Math.floor(Math.random() * 10000)
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_URL?.replace(/^http/, "ws")}/ws/${userId}?is_audio=${audioMode}`
    )

    ws.onopen = () => {
      setIsConnected(true)
      console.log("Connected to ThalCare AI")
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.turn_complete && data.turn_complete === true) {
        setIsTyping(false)
        currentMessageIdRef.current = null
        return
      }

      if (data.interrupted && data.interrupted === true) {
        setIsTyping(false)
        if (audioPlayerNodeRef.current) {
          audioPlayerNodeRef.current.port.postMessage({ command: "endOfAudio" })
        }
        return
      }

      if (data.mime_type === "audio/pcm" && audioPlayerNodeRef.current && !isMuted) {
        audioPlayerNodeRef.current.port.postMessage(base64ToArray(data.data))
      }

      if (data.mime_type === "text/plain") {
        setIsTyping(true)
        // If no current message, start a new one for this turn
        if (currentMessageIdRef.current === null) {
          currentMessageIdRef.current = Math.random().toString(36).substring(7)
          const newMessage: Message = {
            id: currentMessageIdRef.current,
            content: data.data,
            sender: "ai",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, newMessage])
        } else {
          // Only append if turn is not completed
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === currentMessageIdRef.current ? { ...msg, content: msg.content + data.data } : msg,
            ),
          )
        }
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      console.log("Disconnected from ThalCare AI")
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      setIsConnected(false)
    }

    wsRef.current = ws
  }

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (bufferTimerRef.current) {
        clearInterval(bufferTimerRef.current)
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (!inputValue.trim() || !wsRef.current) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Send message via WebSocket
    const message = {
      mime_type: "text/plain",
      data: inputValue,
    }
    wsRef.current.send(JSON.stringify(message))

    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    { label: "Find Blood Donors", action: "I need to find blood donors in my area", icon: Heart },
    { label: "Emergency Request", action: "This is an emergency blood request", icon: AlertCircle },
    { label: "Appointment Reminder", action: "Set up appointment reminders", icon: Phone },
    { label: "Donor Coordination", action: "Help me coordinate with donors", icon: Bot },
  ]

    // Send lat/long to WebSocket as text/plain
    const sendLocation = () => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const message = {
            mime_type: "text/plain",
            data: `lat: ${lat}, long: ${long}`,
          };
          if (wsRef.current) {
            wsRef.current.send(JSON.stringify(message));
          }
        },
        (error) => {
          alert("Unable to retrieve your location.");
        }
      );
    };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-12rem)] shadow-lg">
                <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/10 rounded-full ring-2 ring-primary/20">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-xl">ThalCare AI Assistant</CardTitle>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-destructive"}`}
                            />
                            <span className="text-sm text-muted-foreground font-medium">
                              {isConnected ? "Connected" : "Connecting..."}
                            </span>
                          </div>
                          {isVoiceEnabled && (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                              <span className="text-sm text-accent font-medium">Voice Active</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!isVoiceEnabled ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={startVoiceConversation}
                          className="hover:bg-primary/10 bg-transparent"
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Start Voice
                        </Button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleMute}
                            className="hover:bg-muted bg-transparent"
                          >
                            {isMuted ? (
                              <VolumeX className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Volume2 className="h-4 w-4 text-primary" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={stopVoiceConversation}
                            className={`hover:bg-destructive/10 ${isRecording ? "bg-destructive/5 border-destructive/30" : ""}`}
                          >
                            <MicOff className="h-4 w-4 mr-2" />
                            Stop Voice
                          </Button>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-accent/10 border-accent/30 bg-transparent"
                        onClick={sendLocation}
                      >
                        <Phone className="h-4 w-4 mr-2 text-accent" />
                        Send Location
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 flex flex-col h-full">
                  <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start space-x-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                          >
                            <div
                              className={`p-2.5 rounded-full shadow-sm ${
                                message.sender === "user"
                                  ? "bg-primary/10 ring-1 ring-primary/20"
                                  : "bg-muted ring-1 ring-border"
                              }`}
                            >
                              {message.sender === "user" ? (
                                <User className="h-4 w-4 text-primary" />
                              ) : (
                                <Bot className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div
                              className={`p-4 rounded-2xl shadow-sm ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground rounded-tr-md"
                                  : "bg-muted/50 border border-border rounded-tl-md"
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              <p className="text-xs opacity-70 mt-2 font-medium">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-3 max-w-[85%]">
                            <div className="p-2.5 rounded-full bg-muted ring-1 ring-border">
                              <Bot className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="bg-muted/50 border border-border p-4 rounded-2xl rounded-tl-md">
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                                  <div
                                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  />
                                  <div
                                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="border-t bg-muted/20 p-6">
                    {isVoiceEnabled && (
                      <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center justify-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${isRecording ? "bg-accent animate-pulse" : "bg-muted-foreground"}`}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {isRecording ? "Voice conversation active - AI is listening..." : "Voice mode enabled"}
                          </span>
                          <Mic className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Input
                        placeholder={
                          isVoiceEnabled
                            ? "Voice conversation active - speak to chat or type here..."
                            : "Ask about blood management, donor coordination, emergency requests..."
                        }
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 bg-background border-border focus:ring-2 focus:ring-primary/20"
                        disabled={!isConnected}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!inputValue.trim() || !isConnected}
                        className="bg-primary hover:bg-primary/90 shadow-sm"
                        size="default"
                      >
                        {!isConnected ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-lg flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-4 bg-background hover:bg-muted/50 border-border"
                        onClick={() => setInputValue(action.action)}
                      >
                        <IconComponent className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* AI Features */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-lg flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-primary" />
                    AI Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/5">
                    <Heart className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Blood Bridge Coordination</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-accent/5">
                    <AlertCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">Emergency Request System</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/5">
                    <Bot className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Predictive Donor Engagement</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                    <Send className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium">Smart Message Routing</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-background">
                    <span className="text-sm font-medium">AI Assistant</span>
                    <Badge variant={isConnected ? "default" : "destructive"} className="font-medium">
                      {isConnected ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-background">
                    <span className="text-sm font-medium">Voice Mode</span>
                    <Badge variant={isVoiceEnabled ? "default" : "secondary"} className="font-medium">
                      {isVoiceEnabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-background">
                    <span className="text-sm font-medium">Blood Database</span>
                    <Badge variant="default" className="font-medium">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-background">
                    <span className="text-sm font-medium">Emergency System</span>
                    <Badge variant="default" className="font-medium">
                      Ready
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
