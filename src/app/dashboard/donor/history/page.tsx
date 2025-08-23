import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, Download, Calendar, MapPin, Award } from 'lucide-react'

export default function DonationHistoryPage() {
  const donations = [
    {
      id: 1,
      date: "March 15, 2024",
      location: "City Blood Bank",
      address: "123 Main St, Downtown",
      type: "Whole Blood",
      amount: "450ml",
      status: "Completed",
      certificate: true,
      impact: "Helped 3 patients"
    },
    {
      id: 2,
      date: "December 10, 2023",
      location: "Metro Medical Center",
      address: "456 Health Ave, Midtown",
      type: "Platelets",
      amount: "300ml",
      status: "Completed",
      certificate: true,
      impact: "Helped 2 patients"
    },
    {
      id: 3,
      date: "September 5, 2023",
      location: "Community Health Drive",
      address: "789 Park Rd, Suburbs",
      type: "Whole Blood",
      amount: "450ml",
      status: "Completed",
      certificate: true,
      impact: "Helped 3 patients"
    },
    {
      id: 4,
      date: "June 20, 2023",
      location: "University Hospital",
      address: "321 Campus Dr, University",
      type: "Plasma",
      amount: "600ml",
      status: "Completed",
      certificate: true,
      impact: "Helped 4 patients"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <History className="h-8 w-8 text-red-600" />
            Donation History
          </h1>
          <p className="text-gray-600">Track your life-saving contributions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">12</div>
              <div className="text-sm text-red-700">Total Donations</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5.4L</div>
              <div className="text-sm text-blue-700">Blood Donated</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">36</div>
              <div className="text-sm text-green-700">Lives Impacted</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2.5</div>
              <div className="text-sm text-purple-700">Years Active</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation History List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Donation Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">{donation.date}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {donation.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{donation.location}</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{donation.address}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-gray-600">Type: </span>
                          <span className="font-medium text-gray-900">{donation.type}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Amount: </span>
                          <span className="font-medium text-gray-900">{donation.amount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Award className="h-4 w-4" />
                      <span>{donation.impact}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {donation.certificate && (
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="h-3 w-3" />
                        Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
