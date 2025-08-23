import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Heart, Phone, Mail, MapPin, Calendar, Shield, Edit } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <User className="h-8 w-8 text-blue-600" />
            Profile & Health Information
          </h1>
          <p className="text-gray-600">Manage your personal and health details</p>
        </div>
        <Button className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value="John" readOnly />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value="Doe" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value="john.doe@email.com" readOnly />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value="+1 (555) 123-4567" readOnly />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value="123 Main Street, Apt 4B, Downtown, City 12345" readOnly />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" value="January 15, 1990" readOnly />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" value="Male" readOnly />
                </div>
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input id="bloodType" value="O+" readOnly className="font-semibold text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" value="75" readOnly />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" value="180" readOnly />
                </div>
                <div>
                  <Label htmlFor="bmi">BMI</Label>
                  <Input id="bmi" value="23.1 (Normal)" readOnly className="text-green-600" />
                </div>
              </div>

              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea id="allergies" value="None reported" readOnly />
              </div>

              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea id="medications" value="None" readOnly />
              </div>

              <div>
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea id="medicalConditions" value="No significant medical history" readOnly />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastCheckup">Last Medical Checkup</Label>
                  <Input id="lastCheckup" value="February 10, 2024" readOnly />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" value="Jane Doe - (555) 987-6543" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Donation Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredTime">Preferred Donation Time</Label>
                  <Input id="preferredTime" value="Morning (9 AM - 12 PM)" readOnly />
                </div>
                <div>
                  <Label htmlFor="frequency">Preferred Frequency</Label>
                  <Input id="frequency" value="Every 3 months" readOnly />
                </div>
              </div>

              <div>
                <Label htmlFor="preferredLocations">Preferred Donation Locations</Label>
                <Textarea id="preferredLocations" value="City Blood Bank, Metro Medical Center" readOnly />
              </div>

              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Email Reminders
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    SMS Alerts
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    Emergency Notifications
                  </Badge>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    Event Updates
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-600">O+ Universal Donor</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Verified Donor</Badge>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Downtown, City</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Member since 2022</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Donation Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-red-700">Total Donations</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">36</div>
                <div className="text-sm text-blue-700">Lives Saved</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2.5</div>
                <div className="text-sm text-green-700">Years Active</div>
              </div>
            </CardContent>
          </Card>

          {/* Health Status */}
          <Card>
            <CardHeader>
              <CardTitle>Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Eligibility</span>
                  <Badge className="bg-green-100 text-green-800">Eligible</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Donation</span>
                  <span className="text-sm text-gray-900">March 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Eligible</span>
                  <span className="text-sm text-gray-900">June 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Health Check</span>
                  <Badge className="bg-blue-100 text-blue-800">Up to Date</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
