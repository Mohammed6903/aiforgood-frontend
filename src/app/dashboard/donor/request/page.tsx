import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Phone, Navigation, AlertTriangle } from "lucide-react"

export default function BloodRequestsPage() {
  const urgentRequests = [
    {
      id: 1,
      bloodType: "O+",
      hospital: "City General Hospital",
      address: "123 Emergency Ave, Downtown",
      distance: "2.3 km",
      urgency: "Critical",
      timePosted: "15 minutes ago",
      unitsNeeded: 4,
      phone: "(555) 911-1234",
      patientAge: "45 years",
      reason: "Emergency Surgery",
    },
    {
      id: 2,
      bloodType: "O+",
      hospital: "Metro Medical Center",
      address: "456 Health St, Midtown",
      distance: "4.1 km",
      urgency: "Urgent",
      timePosted: "1 hour ago",
      unitsNeeded: 2,
      phone: "(555) 456-7890",
      patientAge: "28 years",
      reason: "Accident Trauma",
    },
  ]

  const matchingRequests = [
    {
      id: 3,
      bloodType: "O+",
      hospital: "University Hospital",
      address: "789 Campus Dr, University",
      distance: "6.8 km",
      urgency: "Moderate",
      timePosted: "3 hours ago",
      unitsNeeded: 3,
      phone: "(555) 123-9876",
      patientAge: "62 years",
      reason: "Scheduled Surgery",
    },
    {
      id: 4,
      bloodType: "O+",
      hospital: "Children's Medical Center",
      address: "321 Kids Way, Suburbs",
      distance: "8.2 km",
      urgency: "Moderate",
      timePosted: "5 hours ago",
      unitsNeeded: 1,
      phone: "(555) 234-5678",
      patientAge: "12 years",
      reason: "Treatment Support",
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "Urgent":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-600" />
            Blood Requests
          </h1>
          <p className="text-gray-600">Help save lives by responding to blood requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <MapPin className="h-4 w-4" />
            Filter by Location
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 gap-2">
            <Heart className="h-4 w-4" />
            Emergency Response
          </Button>
        </div>
      </div>

      {/* Your Blood Type Match */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Heart className="h-5 w-5" />
            Your Blood Type: O+ Universal Donor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">
            As an O+ donor, your blood can help O+ and AB+ patients. You're currently eligible to donate and can make a
            life-saving difference today!
          </p>
        </CardContent>
      </Card>

      {/* Critical & Urgent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Critical & Urgent Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urgentRequests.map((request) => (
              <div
                key={request.id}
                className="border-2 border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{request.bloodType}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.hospital}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{request.timePosted}</span>
                        </div>
                      </div>
                      <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{request.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{request.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{request.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600">Units needed: </span>
                          <span className="font-semibold text-red-600">{request.unitsNeeded}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Patient: </span>
                          <span className="text-gray-900">{request.patientAge}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Reason: </span>
                          <span className="text-gray-900">{request.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="bg-red-600 hover:bg-red-700 gap-2">
                      <Heart className="h-4 w-4" />
                      Respond Now
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Navigation className="h-3 w-3" />
                      Directions
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Phone className="h-3 w-3" />
                      Call Hospital
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Matching Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-blue-600" />
            Other Matching Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {matchingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{request.bloodType}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.hospital}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{request.timePosted}</span>
                        </div>
                      </div>
                      <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-700">{request.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Navigation className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-700">{request.distance} away</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-gray-600">Units: </span>
                          <span className="font-medium text-gray-900">{request.unitsNeeded}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Reason: </span>
                          <span className="text-gray-900">{request.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Heart className="h-4 w-4" />
                      Respond
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Navigation className="h-3 w-3" />
                      Directions
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Your Response Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-sm text-red-700">Emergency Responses</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-blue-700">Total Responses</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2.1</div>
              <div className="text-sm text-green-700">Avg Response Time (hrs)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-purple-700">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
