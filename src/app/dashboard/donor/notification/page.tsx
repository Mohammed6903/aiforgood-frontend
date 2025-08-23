import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Calendar, Heart, Award, Settings, Check, X, Clock, MapPin } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "emergency",
      title: "Urgent Blood Request - O+ Needed",
      message: "City General Hospital needs O+ blood for emergency surgery. You're 2.3km away.",
      time: "5 minutes ago",
      read: false,
      actionable: true,
      location: "City General Hospital",
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment Reminder",
      message: "Your blood donation appointment is tomorrow at 10:00 AM at City Blood Bank.",
      time: "2 hours ago",
      read: false,
      actionable: true,
      location: "City Blood Bank",
    },
    {
      id: 3,
      type: "achievement",
      title: "New Badge Earned!",
      message: "Congratulations! You've earned the 'Emergency Responder' badge for responding to 5 urgent requests.",
      time: "1 day ago",
      read: true,
      actionable: false,
    },
    {
      id: 4,
      type: "eligibility",
      title: "You're Eligible to Donate Again",
      message: "It's been 8 weeks since your last donation. You can now schedule your next appointment.",
      time: "2 days ago",
      read: true,
      actionable: true,
    },
    {
      id: 5,
      type: "request",
      title: "Blood Request Match",
      message: "Metro Medical Center has a moderate priority request for O+ blood. 4.1km away.",
      time: "3 days ago",
      read: true,
      actionable: true,
      location: "Metro Medical Center",
    },
    {
      id: 6,
      type: "system",
      title: "Profile Update Required",
      message: "Please update your emergency contact information in your profile.",
      time: "5 days ago",
      read: true,
      actionable: true,
    },
    {
      id: 7,
      type: "event",
      title: "Blood Drive Event",
      message: "Community Blood Drive on June 20th at Community Center. Pre-register now!",
      time: "1 week ago",
      read: true,
      actionable: true,
      location: "Community Center",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-600" />
      case "eligibility":
        return <Heart className="h-4 w-4 text-green-600" />
      case "request":
        return <Heart className="h-4 w-4 text-orange-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string, read: boolean) => {
    if (read) return "bg-white border-gray-200"

    switch (type) {
      case "emergency":
        return "bg-red-50 border-red-200"
      case "appointment":
        return "bg-blue-50 border-blue-200"
      case "achievement":
        return "bg-yellow-50 border-yellow-200"
      case "eligibility":
        return "bg-green-50 border-green-200"
      case "request":
        return "bg-orange-50 border-orange-200"
      case "event":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            Notifications
            {unreadCount > 0 && <Badge className="bg-red-600 text-white">{unreadCount} new</Badge>}
          </h1>
          <p className="text-gray-600">Stay updated with important alerts and reminders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Check className="h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Emergency Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Appointments</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Achievements</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total This Week</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-2 rounded-lg p-4 ${getNotificationColor(notification.type, notification.read)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                      </div>

                      <p className={`text-sm mb-2 ${!notification.read ? "text-gray-700" : "text-gray-600"}`}>
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>
                        {notification.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{notification.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {notification.actionable && (
                      <>
                        {notification.type === "emergency" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Respond
                          </Button>
                        )}
                        {notification.type === "appointment" && (
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        )}
                        {notification.type === "eligibility" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Book Now
                          </Button>
                        )}
                        {notification.type === "request" && (
                          <Button size="sm" variant="outline">
                            View Request
                          </Button>
                        )}
                        {notification.type === "system" && (
                          <Button size="sm" variant="outline">
                            Update
                          </Button>
                        )}
                        {notification.type === "event" && (
                          <Button size="sm" variant="outline">
                            Register
                          </Button>
                        )}
                      </>
                    )}

                    <Button size="sm" variant="ghost" className="p-1">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Email Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Emergency blood requests</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Appointment reminders</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Achievement notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Weekly summary</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">SMS Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Critical emergency alerts</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Appointment confirmations</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Eligibility reminders</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Event announcements</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button className="gap-2">
              <Settings className="h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
