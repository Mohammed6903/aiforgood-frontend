"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Users,
    Activity,
    MapPin,
    Clock,
    AlertTriangle,
    CheckCircle,
    UserPlus,
    Search,
    X,
    Filter,
    ArrowRight,
} from "lucide-react";
import DonorMap from "@/components/Maps";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";

export default function PatientDashboard() {
  type Donor = {
    donor_id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    blood_type: string;
    last_donation_date: string | null;
    total_donations: number;
    location_name: string;
    distance_meters: number;
    distance_km: number;
    is_available: boolean;
    days_since_last_donation: number | null;
  };


  type RequestItem = {
    id: string;
    bloodType: string;
    units: number;
    hospital: string;
    status: "Critical" | "Urgent" | "Fulfilled";
    priority: "Searching Donors" | "Donor Matched" | "Completed";
  };

  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:8000/nearby-donors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonors(res.data);
      } catch (err) {
        console.error("Failed to fetch donors:", err);
      }
    };
    fetchDonors();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [user, setUser] = useState<any>(null);

  const allRequests: RequestItem[] = [
    {
      id: "1",
      bloodType: "AB-",
      units: 2,
      hospital: "City Hospital",
      status: "Critical",
      priority: "Searching Donors",
    },
    {
      id: "2",
      bloodType: "AB-",
      units: 1,
      hospital: "Metro Medical",
      status: "Urgent",
      priority: "Donor Matched",
    },
    {
      id: "3",
      bloodType: "AB-",
      units: 3,
      hospital: "General Hospital",
      status: "Fulfilled",
      priority: "Completed",
    },
    {
      id: "4",
      bloodType: "O+",
      units: 1,
      hospital: "Regional Medical",
      status: "Urgent",
      priority: "Searching Donors",
    },
    {
      id: "5",
      bloodType: "A-",
      units: 2,
      hospital: "Central Hospital",
      status: "Critical",
      priority: "Donor Matched",
    },
    {
      id: "6",
      bloodType: "B+",
      units: 1,
      hospital: "University Hospital",
      status: "Fulfilled",
      priority: "Completed",
    },
  ];

  const filteredRequests = allRequests.filter((request) => {
    const matchesSearch =
      request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

   useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get token from localStorage (or cookies if you use cookies)
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  const getRequestIcon = (status: string) => {
    switch (status) {
      case "Critical":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "Urgent":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "Fulfilled":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRequestStyles = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-50 rounded-lg border-l-4 border-red-500";
      case "Urgent":
        return "bg-yellow-50 rounded-lg border-l-4 border-yellow-500";
      case "Fulfilled":
        return "bg-green-50 rounded-lg border-l-4 border-green-500";
      default:
        return "bg-gray-50 rounded-lg border-l-4 border-gray-500";
    }
  };

  const getBadgeVariant = (priority: string) => {
    switch (priority) {
      case "Searching Donors":
        return "destructive";
      case "Donor Matched":
        return "outline";
      case "Completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const getBadgeClassName = (priority: string) => {
    switch (priority) {
      case "Donor Matched":
        return "border-yellow-600 text-yellow-600";
      case "Completed":
        return "border-green-600 text-green-600";
      default:
        return "";
    }
  };

  const handleRequest = (donor: Donor) => {
    // Show a toast notification when a request is sent
    // If using shadcn/ui's toast:
    toast.success("✅ Request sent successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Sarah!</h1>
          <p className="text-gray-600">
            Manage your blood requests and track donations
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <Card className="border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Users className="h-5 w-5 text-blue-600" />
            Patient Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">AB-</div>
              <div className="text-sm text-gray-500 mt-1">Blood Group</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-500 mt-1">Active Requests</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-500 mt-1">
                Fulfilled Requests
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Blood Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
              🩸 Available Donors Near You
            </h2>
            <Link
              href="/donors"
              className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
            >
              <span>See All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Donor List */}
          <div className="space-y-4">
            {donors.map((d) => (
              <div
                key={d.donor_id}
                className="flex justify-between items-center border border-gray-200 p-4 rounded-xl hover:shadow-md transition"
              >
                {/* Donor Info */}
                <div>
                  <p className="font-semibold text-lg">{d.name}</p>
                  <p className="text-sm text-gray-600">
                    Blood Group:{" "}
                    <span className="font-semibold text-red-500">
                      {d.blood_type}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Last Donation: {d.last_donation_date ? d.last_donation_date : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Location: {d.location_name}, {d.city}
                  </p>
                  <p className="text-xs text-gray-500">
                    Distance: {d.distance_km.toFixed(2)} km
                  </p>
                </div>

                {/* Availability */}
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${d.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {d.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Request Button */}
                <button
                  onClick={() => handleRequest(d)}
                  disabled={!d.is_available}
                  className={`ml-4 px-5 py-2 rounded-lg text-sm font-semibold transition
                    ${!d.is_available
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                  Request
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-xl mt-3">
          <DonorMap />
        </div>
      </div>
      {/* Emergency Tracking */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Live Request Tracking
            </CardTitle>

            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-3 lg:w-96">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by hospital, blood type, or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Results Info */}
          {(searchQuery || statusFilter !== "All") && (
            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>
                Showing {filteredRequests.length} of {allRequests.length}{" "}
                requests
                {searchQuery && ` for "${searchQuery}"`}
                {statusFilter !== "All" && ` with status "${statusFilter}"`}
              </span>
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear filters
              </button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className={`flex items-center justify-between p-4 ${getRequestStyles(
                    request.status
                  )}`}
                >
                  <div className="flex items-center gap-3">
                    {getRequestIcon(request.status)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {request.status} Request - {request.bloodType} Blood
                      </p>
                      <p className="text-sm text-gray-700">
                        {request.units} {request.units === 1 ? "unit" : "units"}{" "}
                        needed at {request.hospital}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={getBadgeVariant(request.priority)}
                    className={getBadgeClassName(request.priority)}
                  >
                    {request.priority}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No requests found</p>
                <p className="text-sm">
                  {searchQuery || statusFilter !== "All"
                    ? "Try adjusting your search criteria or filters"
                    : "No active requests at the moment"}
                </p>
              </div>
            )}
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
                <p className="font-medium text-purple-900">
                  Nearest Blood Banks
                </p>
                <ul className="text-sm text-purple-700 mt-1 space-y-1">
                  <li>• City Blood Bank - 1.2 km (AB- Available)</li>
                  <li>• Metro Blood Center - 2.8 km (AB- Available)</li>
                  <li>• Regional Blood Bank - 4.5 km (AB- Available)</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">
                  Alternative Hospitals
                </p>
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
                  <p className="text-sm text-green-700">
                    Logistics Coordinator
                  </p>
                  <p className="text-xs text-green-600">
                    Available for transport assistance
                  </p>
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
                <p className="text-sm text-gray-600">
                  March 10, 2024 - 2 units at City Hospital
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Fulfilled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">AB- Blood Request</p>
                <p className="text-sm text-gray-600">
                  February 15, 2024 - 1 unit at Metro Medical
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Fulfilled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">AB- Blood Request</p>
                <p className="text-sm text-gray-600">
                  January 22, 2024 - 3 units at General Hospital
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Fulfilled
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
