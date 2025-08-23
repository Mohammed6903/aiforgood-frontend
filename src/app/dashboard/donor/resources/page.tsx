import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ExternalLink, Heart, Shield, AlertCircle, CheckCircle, Clock, Users } from "lucide-react"

export default function ResourcesPage() {
  const eligibilityRequirements = [
    { requirement: "Age 18-65 years", met: true },
    { requirement: "Weight at least 50kg", met: true },
    { requirement: "Good general health", met: true },
    { requirement: "No recent illness", met: true },
    { requirement: "No recent travel to malaria areas", met: true },
    { requirement: "No recent tattoos/piercings (3 months)", met: true },
  ]

  const donationTypes = [
    {
      type: "Whole Blood",
      duration: "10-15 minutes",
      frequency: "Every 8 weeks",
      description: "Most common type of donation. Your blood is used as-is or separated into components.",
      benefits: "Helps trauma patients, surgery patients, and those with blood disorders",
    },
    {
      type: "Platelets",
      duration: "1.5-2 hours",
      frequency: "Every 2 weeks",
      description: "Platelets are collected while other blood components are returned to you.",
      benefits: "Critical for cancer patients and those undergoing chemotherapy",
    },
    {
      type: "Plasma",
      duration: "1-1.5 hours",
      frequency: "Every 4 weeks",
      description: "Plasma is separated and collected while red cells are returned.",
      benefits: "Used for burn victims, trauma patients, and immune deficiency treatments",
    },
    {
      type: "Double Red Cells",
      duration: "25-35 minutes",
      frequency: "Every 16 weeks",
      description: "Two units of red blood cells are collected using an automated process.",
      benefits: "Ideal for trauma patients and those needing surgery",
    },
  ]

  const preparationTips = [
    {
      category: "Before Donation",
      tips: [
        "Get a good night's sleep (7-8 hours)",
        "Eat a healthy meal 3 hours before",
        "Drink plenty of water (16 oz extra)",
        "Avoid alcohol for 24 hours",
        "Bring valid ID and donor card",
      ],
    },
    {
      category: "During Donation",
      tips: [
        "Relax and stay calm",
        "Squeeze your hand regularly",
        "Let staff know if you feel unwell",
        "Stay hydrated with provided fluids",
        "Take your time - don't rush",
      ],
    },
    {
      category: "After Donation",
      tips: [
        "Rest for 10-15 minutes",
        "Drink extra fluids for 24 hours",
        "Avoid heavy lifting for 24 hours",
        "Eat iron-rich foods",
        "Keep bandage on for 4-6 hours",
      ],
    },
  ]

  const resources = [
    {
      title: "Blood Donation Guide",
      description: "Complete guide to blood donation process and requirements",
      type: "PDF",
      size: "2.3 MB",
    },
    {
      title: "Nutrition for Donors",
      description: "Dietary recommendations for blood donors",
      type: "PDF",
      size: "1.8 MB",
    },
    {
      title: "Recovery Tips",
      description: "Post-donation care and recovery guidelines",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      title: "Emergency Response Protocol",
      description: "How to respond to urgent blood requests",
      type: "PDF",
      size: "2.1 MB",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-green-600" />
            Resources & Guidelines
          </h1>
          <p className="text-gray-600">Everything you need to know about blood donation</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Download All Guides
        </Button>
      </div>

      {/* Eligibility Check */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Your Eligibility Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibilityRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-3">
                {req.met ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={req.met ? "text-green-700" : "text-red-700"}>{req.requirement}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">✅ You are eligible to donate blood!</p>
            <p className="text-green-700 text-sm">Next eligible donation: June 15, 2024</p>
          </div>
        </CardContent>
      </Card>

      {/* Donation Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Types of Blood Donation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donationTypes.map((donation, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{donation.type}</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {donation.frequency}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{donation.duration}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{donation.description}</p>

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Benefits:</strong> {donation.benefits}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preparation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Donation Preparation Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preparationTips.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {index === 0 && <Clock className="h-4 w-4 text-blue-600" />}
                  {index === 1 && <Heart className="h-4 w-4 text-red-600" />}
                  {index === 2 && <Shield className="h-4 w-4 text-green-600" />}
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Downloadable Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-purple-600" />
            Downloadable Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{resource.size}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">How often can I donate blood?</h3>
              <p className="text-sm text-gray-700">
                You can donate whole blood every 8 weeks (56 days). Other donation types have different intervals.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Is blood donation safe?</h3>
              <p className="text-sm text-gray-700">
                Yes, blood donation is very safe. All equipment is sterile and used only once. There's no risk of
                contracting diseases.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">What should I do if I feel dizzy after donating?</h3>
              <p className="text-sm text-gray-700">
                Sit down immediately, drink fluids, and notify staff. This is normal and usually passes quickly with
                rest.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">Can I donate if I'm taking medication?</h3>
              <p className="text-sm text-gray-700">
                Most medications don't prevent donation, but some may require waiting periods. Check with staff about
                your specific medications.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              View Complete FAQ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
