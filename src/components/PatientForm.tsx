'use client';

import { useState } from 'react';

interface PatientFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
  maritalStatus: string;
  
  // Contact Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  
  // Insurance Information
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  policyHolder: string;
  
  // Medical Information
  primaryPhysician: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
  
  // Consent
  consentTreatment: boolean;
  consentPrivacy: boolean;
}

const PatientRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    ssn: '',
    maritalStatus: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    policyHolder: '',
    primaryPhysician: '',
    allergies: '',
    medications: '',
    medicalHistory: '',
    consentTreatment: false,
    consentPrivacy: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    'Personal Information',
    'Contact Information', 
    'Emergency Contact',
    'Insurance & Medical',
    'Review & Submit'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
          <p className="text-gray-600">Thank you for registering. We'll contact you soon to schedule your appointment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Patient Registration</h1>
            <p className="text-blue-100 mt-2">Please complete all sections to register</p>
          </div>

          {/* Progress Bar */}
          <div className="px-8 py-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index + 1 === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : index + 1 < currentStep 
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1 < currentStep ? '✓' : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      index + 1 < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Number</label>
                    <input
                      type="password"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="XXX-XX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="(XXX) XXX-XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
                    <input
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Full name of emergency contact"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                    <select
                      name="emergencyRelationship"
                      value={formData.emergencyRelationship}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    >
                      <option value="">Select relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="child">Child</option>
                      <option value="sibling">Sibling</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone Number *</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="(XXX) XXX-XXXX"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Insurance & Medical */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance & Medical Information</h2>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                      <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="e.g., Blue Cross Blue Shield"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                      <input
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Policy number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
                      <input
                        type="text"
                        name="groupNumber"
                        value={formData.groupNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Group number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Policy Holder Name</label>
                      <input
                        type="text"
                        name="policyHolder"
                        value={formData.policyHolder}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Name of policy holder"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Care Physician</label>
                      <input
                        type="text"
                        name="primaryPhysician"
                        value={formData.primaryPhysician}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Dr. Name and practice"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                      <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="List any known allergies or write 'None'"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                      <textarea
                        name="medications"
                        value={formData.medications}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="List current medications and dosages or write 'None'"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                      <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Brief overview of relevant medical history, surgeries, chronic conditions"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date of Birth:</span>
                      <span className="ml-2 text-gray-900">{formData.dateOfBirth}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-900">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-900">{formData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consentTreatment"
                      name="consentTreatment"
                      checked={formData.consentTreatment}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="consentTreatment" className="ml-3 text-sm text-gray-700">
                      I consent to treatment and understand the practice policies *
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consentPrivacy"
                      name="consentPrivacy"
                      checked={formData.consentPrivacy}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="consentPrivacy" className="ml-3 text-sm text-gray-700">
                      I have read and agree to the privacy policy (HIPAA) *
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.consentTreatment || !formData.consentPrivacy}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
                >
                  Submit Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;