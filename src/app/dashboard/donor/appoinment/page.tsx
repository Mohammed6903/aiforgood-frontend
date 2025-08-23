import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus, Phone, Navigation } from "lucide-react"

export default function AppointmentsPage() {
  const upcomingAppointments = [
    {
      id: 1,
      date: "June 20, 2024",
      time: "10:00 AM",
      location: "City Blood Bank",
      address: "123 Main St, Downtown",
      type: "Whole Blood Donation",
      status: "Confirmed",
      phone: "(555) 123-4567",
    },
    {
      id: 2,
      date: "July 15, 2024",
      time: "2:30 PM",
      location: "Community Health Drive",
      address: "789 Park Rd, Suburbs",
      type: "Mobile Blood Drive",
      status: "Pending",
      phone: "(555) 987-6543",
    },
  ]

  const availableSlots = [
    {
      id: 1,
      date: "June 25, 2024",
      time: "9:00 AM - 11:00 AM",
      location: "Metro Medical Center",
      address: "456 Health Ave, Midtown",
      available: 5,
    },
    {
      id: 2,
      date: "June 28, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "University Hospital",
      address: "321 Campus Dr, University",
      available: 8,
    },
    {
      id: 3,
      date: "July 2, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Downtown Blood Center",
      address: "654 Central Ave, Downtown",
      available: 12,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            Appointments
          </h1>
          <p className="text-gray-600">Manage your donation schedule</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-gray-900">{appointment.date}</span>
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{appointment.time}</span>
                        <Badge
                          variant={appointment.status === "Confirmed" ? "default" : "secondary"}
                          className={appointment.status === "Confirmed" ? "bg-green-100 text-green-800" : ""}
                        >
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{appointment.location}</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{appointment.address}</p>
                        <div className="flex items-center gap-2 ml-6">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{appointment.phone}</span>
                        </div>
                        <div className="text-sm text-blue-600 font-medium ml-6">{appointment.type}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <Navigation className="h-3 w-3" />
                        Directions
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No upcoming appointments</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            Available Appointment Slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSlots.map((slot) => (
              <div key={slot.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">{slot.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{slot.time}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{slot.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{slot.address}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {slot.available} slots available
                    </Badge>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Calendar className="h-5 w-5" />
              <span>View Calendar</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Clock className="h-5 w-5" />
              <span>Set Reminders</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <MapPin className="h-5 w-5" />
              <span>Find Locations</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
