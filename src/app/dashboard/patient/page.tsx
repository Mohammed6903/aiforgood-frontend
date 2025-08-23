import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, Activity, MapPin, Clock, AlertTriangle, CheckCircle, UserPlus } from "lucide-react"

export default function PatientDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Sarah!</h1>
          <p className="text-gray-600">Manage your blood requests and track donations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Activity className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Patient Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">AB-</div>
              <div className="text-sm text-gray-600">Blood Group</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Active Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Fulfilled Requests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Blood Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-600" />
            Request Blood
          </CardTitle>
          <CardDescription>Submit a new blood request with required details</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type Required</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="units">Units Required</Label>
                <Input id="units" type="number" placeholder="Number of units" min="1" max="10" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical (Within 2 hours)</SelectItem>
                    <SelectItem value="urgent">Urgent (Within 24 hours)</SelectItem>
                    <SelectItem value="moderate">Moderate (Within 3 days)</SelectItem>
                    <SelectItem value="routine">Routine (Within 1 week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Hospital/Location</Label>
                <Input id="location" placeholder="Enter hospital name or address" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional medical information or special requirements" />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Submit Blood Request
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Emergency Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Live Request Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Critical Request - AB- Blood</p>
                  <p className="text-sm text-red-700">2 units needed at City Hospital</p>
                </div>
              </div>
              <Badge variant="destructive">Searching Donors</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">Urgent Request - AB- Blood</p>
                  <p className="text-sm text-yellow-700">1 unit needed at Metro Medical</p>
                </div>
              </div>
              <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                Donor Matched
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Request Fulfilled - AB- Blood</p>
                  <p className="text-sm text-green-700">3 units delivered to General Hospital</p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">
                Completed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations & Volunteer Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">Nearest Blood Banks</p>
                <ul className="text-sm text-purple-700 mt-1 space-y-1">
                  <li>• City Blood Bank - 1.2 km (AB- Available)</li>
                  <li>• Metro Blood Center - 2.8 km (AB- Available)</li>
                  <li>• Regional Blood Bank - 4.5 km (AB- Available)</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">Alternative Hospitals</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• St. Mary's Hospital - 3.1 km</li>
                  <li>• Central Medical Center - 5.2 km</li>
                  <li>• University Hospital - 6.8 km</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-green-600" />
              Volunteer Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Mike Wilson</p>
                  <p className="text-sm text-green-700">Logistics Coordinator</p>
                  <p className="text-xs text-green-600">Available for transport assistance</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Lisa Chen</p>
                  <p className="text-sm text-blue-700">Medical Liaison</p>
                  <p className="text-xs text-blue-600">Assigned to your case</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request History */}
      <Card>
        <CardHeader>
          <CardTitle>Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">AB- Blood Request</p>
                <p className="text-sm text-gray-600">March 10, 2024 - 2 units at City Hospital</p>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">
                Fulfilled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">AB- Blood Request</p>
                <p className="text-sm text-gray-600">February 15, 2024 - 1 unit at Metro Medical</p>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">
                Fulfilled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">AB- Blood Request</p>
                <p className="text-sm text-gray-600">January 22, 2024 - 3 units at General Hospital</p>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">
                Fulfilled
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
