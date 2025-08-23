import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Calendar, Award, Bell, Users, MapPin } from 'lucide-react'

export default function DonorDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Ready to save lives today?</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Heart className="h-4 w-4 mr-2" />
          Donate Now
        </Button>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Donor Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">O+</div>
              <div className="text-sm text-gray-600">Blood Group</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">March 15, 2024</div>
              <div className="text-sm text-gray-600">Last Donation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Available</div>
              <div className="text-sm text-gray-600">Next Eligible: June 15, 2024</div>
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
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lives Saved</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points Earned</p>
                <p className="text-2xl font-bold text-gray-900">1,240</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rank</p>
                <p className="text-2xl font-bold text-gray-900">#47</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                5x Donor
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Hero Donor
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Regular Donor
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Life Saver
              </Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Gold Badge</span>
                <span>8/15 donations</span>
              </div>
              <Progress value={53} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              Emergency Requests Nearby
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">O+ Blood Needed</p>
                  <p className="text-sm text-red-700">City Hospital - 2.3 km away</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">O+ Blood Needed</p>
                  <p className="text-sm text-yellow-700">Metro Medical - 4.1 km away</p>
                </div>
                <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                  Moderate
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Upcoming Donation Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Next Eligible Donation</p>
                <p className="text-sm text-blue-700">June 15, 2024 - You can donate again!</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Blood Drive Event</p>
                <p className="text-sm text-green-700">June 20, 2024 - Community Center</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
    