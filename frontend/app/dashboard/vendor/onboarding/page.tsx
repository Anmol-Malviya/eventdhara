'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Circle, User, Store, MapPin, Upload, FileText, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Personal Details',
    icon: User,
    desc: 'Your name, phone, and email',
    fields: ['Full Name', 'Phone Number', 'Email Address', 'Aadhaar Number'],
  },
  {
    id: 2,
    title: 'Business Info',
    icon: Store,
    desc: 'Your business name and category',
    fields: ['Business Name', 'Service Category', 'Years of Experience', 'GST Number (optional)'],
  },
  {
    id: 3,
    title: 'Location & Coverage',
    icon: MapPin,
    desc: 'Where you operate',
    fields: ['Primary City', 'Service Areas', 'Full Business Address'],
  },
  {
    id: 4,
    title: 'Documents',
    icon: Upload,
    desc: 'KYC and verification docs',
    fields: ['Aadhaar Card Copy', 'PAN Card Copy', 'Business Registration (optional)'],
  },
  {
    id: 5,
    title: 'Review & Submit',
    icon: FileText,
    desc: 'Confirm and submit your application',
    fields: [],
  },
];

type FieldData = Record<string, string>;

export default function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FieldData>({
    'Full Name': '',
    'Phone Number': '',
    'Email Address': '',
    'Aadhaar Number': '',
    'Business Name': '',
    'Service Category': '',
    'Years of Experience': '',
    'GST Number (optional)': '',
    'Primary City': '',
    'Service Areas': '',
    'Full Business Address': '',
  });
  const [submitted, setSubmitted] = useState(false);

  const currentStepData = STEPS[currentStep - 1];
  const isLastStep = currentStep === STEPS.length;

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(s => s + 1);
    else setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Application Submitted!</h1>
          <p className="text-[var(--color-text-muted)] mt-2 text-sm">
            Thank you for registering as a vendor. Our team will review your profile and contact you within 24–48 hours.
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-left space-y-2 text-orange-800">
          <p className="font-semibold">What happens next?</p>
          <ol className="list-decimal list-inside space-y-1 text-orange-700">
            <li>Our team reviews your KYC documents</li>
            <li>We verify your business details</li>
            <li>You receive a WhatsApp confirmation</li>
            <li>Your profile goes live and leads start flowing!</li>
          </ol>
        </div>
        <Button variant="outline">Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendor Onboarding</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Complete all steps to activate your vendor profile.</p>
      </div>

      {/* Step progress */}
      <div className="flex items-start gap-2 overflow-x-auto pb-2">
        {STEPS.map((step, i) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => !isLastStep && setCurrentStep(step.id)}
                disabled={step.id > currentStep}
                className="flex flex-col items-center gap-1 shrink-0 disabled:opacity-40"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' :
                  isActive ? 'border-[var(--color-primary)] bg-orange-50 text-[var(--color-primary)]' :
                  'border-gray-200 bg-white text-gray-400'
                }`}>
                  {isDone ? <CheckCircle className="w-4 h-4" /> : <span className="text-sm font-bold">{step.id}</span>}
                </div>
                <span className={`text-[10px] font-medium text-center max-w-[60px] leading-tight ${isActive ? 'text-[var(--color-primary)]' : isDone ? 'text-gray-600' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 mt-4 flex-1 min-w-[24px] rounded ${isDone ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step card */}
      <Card className="border-2 border-[var(--color-primary)]/40">
        <CardContent className="p-7 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <currentStepData.icon className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{currentStepData.title}</h2>
              <p className="text-xs text-[var(--color-text-muted)]">{currentStepData.desc}</p>
            </div>
            <Badge variant="default" className="ml-auto">Step {currentStep} of {STEPS.length}</Badge>
          </div>

          {!isLastStep ? (
            <div className="space-y-4">
              {currentStepData.fields.map(field => (
                <div key={field}>
                  <label className="text-sm font-medium text-[var(--color-text)] block mb-1.5">{field}</label>
                  {currentStep === 4 ? (
                    <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Click to upload {field}</p>
                      <p className="text-xs text-gray-300 mt-0.5">JPG, PNG or PDF · Max 5MB</p>
                    </div>
                  ) : (
                    <input
                      type={field.toLowerCase().includes('email') ? 'email' : field.toLowerCase().includes('phone') ? 'tel' : 'text'}
                      value={formData[field] ?? ''}
                      onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                      placeholder={`Enter ${field.toLowerCase()}`}
                      className="w-full px-3 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-800 font-medium mb-2">✅ All steps completed! Review your details before submitting.</p>
                <div className="text-xs text-green-700 space-y-1">
                  {Object.entries(formData).filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <span className="text-green-600 font-medium">{k}:</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                By submitting, you agree to EventDhara's{' '}
                <span className="text-[var(--color-primary)] underline cursor-pointer">vendor terms</span> and{' '}
                <span className="text-[var(--color-primary)] underline cursor-pointer">commission policy</span>.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {isLastStep ? 'Submit Application' : 'Next Step'}
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
