import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Truck, Phone, BarChart3, MapPin, Clock, CheckCircle, Users, Calendar, Activity } from "lucide-react"

export default function VolunteerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Mike!</h1>
          <p className="text-gray-600">Coordinating life-saving logistics</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Truck className="h-4 w-4 mr-2" />
          New Assignment
        </Button>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-green-600" />
            Volunteer Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Logistics</div>
              <div className="text-sm text-gray-600">Specialization</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Deliveries Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Active</div>
              <div className="text-sm text-gray-600">Current Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9/5</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Assignments</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lives Impacted</p>
                <p className="text-2xl font-bold text-gray-900">468</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Volunteered</p>
                <p className="text-2xl font-bold text-gray-900">342</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="logistics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
          <TabsTrigger value="coordination">Coordination</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="logistics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Active Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div>
                      <p className="font-medium text-red-900">Critical Delivery</p>
                      <p className="text-sm text-red-700">O- Blood to City Hospital</p>
                      <p className="text-xs text-red-600">ETA: 15 minutes</p>
                    </div>
                    <Badge variant="destructive">In Transit</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <div>
                      <p className="font-medium text-yellow-900">Urgent Pickup</p>
                      <p className="text-sm text-yellow-700">AB+ Blood from Metro Blood Bank</p>
                      <p className="text-xs text-yellow-600">Scheduled: 2:30 PM</p>
                    </div>
                    <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                      Pending
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div>
                      <p className="font-medium text-blue-900">Routine Transport</p>
                      <p className="text-sm text-blue-700">A+ Blood to General Hospital</p>
                      <p className="text-xs text-blue-600">Scheduled: 4:00 PM</p>
                    </div>
                    <Badge variant="outline" className="border-blue-600 text-blue-600">
                      Assigned
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Route Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Optimized Route</p>
                    <p className="text-sm text-green-700 mt-1">Metro Blood Bank → City Hospital → General Hospital</p>
                    <div className="flex justify-between text-xs text-green-600 mt-2">
                      <span>Total Distance: 12.4 km</span>
                      <span>Est. Time: 45 min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Route Efficiency</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    View in Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Communication Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        Online
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">City Hospital - Emergency Department</p>
                    <Button size="sm" className="mt-2">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">John Smith (Donor)</p>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                        En Route
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">O+ Donor - ETA 20 minutes</p>
                    <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Metro Blood Bank</p>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Blood Bank Coordinator</p>
                    <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Team Coordination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-900">Team Alpha</p>
                    <p className="text-sm text-purple-700">3 volunteers active</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="border-green-600 text-green-600 text-xs">
                        Mike W.
                      </Badge>
                      <Badge variant="outline" className="border-blue-600 text-blue-600 text-xs">
                        Lisa C.
                      </Badge>
                      <Badge variant="outline" className="border-orange-600 text-orange-600 text-xs">
                        Tom R.
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Emergency Response</p>
                    <p className="text-sm text-blue-700">2 volunteers on standby</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="border-red-600 text-red-600 text-xs">
                        Anna K.
                      </Badge>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-600 text-xs">
                        David L.
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Delivery Success Rate</span>
                      <span>98.5%</span>
                    </div>
                    <Progress value={98.5} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>On-Time Delivery</span>
                      <span>94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Communication Rating</span>
                      <span>96.8%</span>
                    </div>
                    <Progress value={96.8} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Goal Progress</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-yellow-900">100 Deliveries Milestone</p>
                      <p className="text-sm text-yellow-700">Completed last week</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Perfect Month</p>
                      <p className="text-sm text-green-700">100% success rate in March</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Team Leader</p>
                      <p className="text-sm text-blue-700">Promoted to senior volunteer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-4">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  <div className="p-2 bg-green-100 rounded text-center">
                    <div className="text-sm font-medium">15</div>
                    <div className="text-xs text-green-700">3 deliveries</div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded text-center">
                    <div className="text-sm font-medium">16</div>
                    <div className="text-xs text-blue-700">2 deliveries</div>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded text-center">
                    <div className="text-sm font-medium">17</div>
                    <div className="text-xs text-yellow-700">4 deliveries</div>
                  </div>
                  <div className="p-2 bg-red-100 rounded text-center">
                    <div className="text-sm font-medium">18</div>
                    <div className="text-xs text-red-700">Emergency</div>
                  </div>
                  <div className="p-2 bg-green-100 rounded text-center">
                    <div className="text-sm font-medium">19</div>
                    <div className="text-xs text-green-700">1 delivery</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded text-center">
                    <div className="text-sm font-medium">20</div>
                    <div className="text-xs text-gray-600">Off</div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded text-center">
                    <div className="text-sm font-medium">21</div>
                    <div className="text-xs text-gray-600">Off</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
