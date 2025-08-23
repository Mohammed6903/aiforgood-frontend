import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Users, Activity } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              AI-Powered Healthcare Platform
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-foreground mb-6">
              Empowering Thalassemia Patients Through <span className="text-primary">Community</span> and{" "}
              <span className="text-accent">Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect with donors, manage blood requirements, and get AI-powered support for your thalassemia journey.
              Join a community that cares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/chat">Start AI Chat</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blood-management">Blood Management</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Comprehensive Care Platform</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform provides everything you need for effective thalassemia management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI Chatbot Features */}
              <Card className="border-primary/20">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="font-serif">AI-Powered Chatbot</CardTitle>
                  <CardDescription>Intelligent assistance for all your thalassemia-related queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• AI-Powered Message Routing</li>
                    <li>• Blood Bridge Coordination</li>
                    <li>• Emergency Blood Request System</li>
                    <li>• Predictive Donor Engagement</li>
                    <li>• Automated FAQ Handling</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Blood Management */}
              <Card className="border-accent/20">
                <CardHeader>
                  <Activity className="h-12 w-12 text-accent mb-4" />
                  <CardTitle className="font-serif">Blood Management System</CardTitle>
                  <CardDescription>Comprehensive blood tracking and donor coordination</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Volunteer/Donor Dashboard</li>
                    <li>• Real-Time Analytics & Statistics</li>
                    <li>• User & Donor Management</li>
                    <li>• Emergency Blood Tracking</li>
                    <li>• AI-Driven Reports</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Community Features */}
              <Card className="border-primary/20">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="font-serif">Community & Gamification</CardTitle>
                  <CardDescription>Engage with donors through rewards and recognition</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Donor Gamification System</li>
                    <li>• Badges & Leaderboards</li>
                    <li>• Milestone Tracking</li>
                    <li>• Rewards & Recognition</li>
                    <li>• Consistent Engagement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-serif font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Patients Supported</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-accent mb-2">5K+</div>
                <div className="text-muted-foreground">Active Donors</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Blood Units Coordinated</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">AI Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of patients and donors who trust ThalCare AI for their healthcare needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/chat">Start AI Chat</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blood-management">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="font-serif font-bold text-lg">ThalCare AI</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Empowering thalassemia patients through AI-powered healthcare solutions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/chat" className="hover:text-primary">
                      AI Assistant
                    </Link>
                  </li>
                  <li>
                    <Link href="/blood-management" className="hover:text-primary">
                      Blood Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="hover:text-primary">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/help" className="hover:text-primary">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/emergency" className="hover:text-primary">
                      Emergency
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/privacy" className="hover:text-primary">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-primary">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/medical-disclaimer" className="hover:text-primary">
                      Medical Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 ThalCare AI. All rights reserved. Built with care for the thalassemia community.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
