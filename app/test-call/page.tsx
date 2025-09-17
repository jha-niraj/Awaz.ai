'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Phone, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ServiceStatus {
  elevenlabs: { configured: boolean; status: string };
  twilio: { configured: boolean; status: string };
  ready: boolean;
}

interface CallResult {
  callSid: string;
  phoneNumber: string;
  name: string;
  language: string;
  message: string;
  status: string;
}

const LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ne: 'Nepali',
};

export default function TestCallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [useElevenLabs, setUseElevenLabs] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [isCheckingServices, setIsCheckingServices] = useState(true);

  // Check service status on component mount and pre-fill form data
  useEffect(() => {
    checkServiceStatus();
    
    // Pre-fill form data from hero section if available
    if (typeof window !== 'undefined') {
      const demoData = sessionStorage.getItem('demoCallData');
      if (demoData) {
        try {
          const { name: demoName, country, phoneNumber: demoPhone } = JSON.parse(demoData);
          if (demoName) setName(demoName);
          if (demoPhone) setPhoneNumber(demoPhone);
          // Clear the session storage after using it
          sessionStorage.removeItem('demoCallData');
        } catch (error) {
          console.log('Failed to parse demo data:', error);
        }
      }
    }
  }, []);

  const checkServiceStatus = async () => {
    try {
      setIsCheckingServices(true);
      const response = await fetch('/api/voice/test-call');
      const data = await response.json();
      
      if (data.success) {
        setServiceStatus(data);
      }
    } catch (error) {
      console.error('Failed to check service status:', error);
      toast.error('Failed to check service configuration');
    } finally {
      setIsCheckingServices(false);
    }
  };

  const handleTestCall = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    setIsLoading(true);
    setCallResult(null);

    try {
      const response = await fetch('/api/voice/test-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          name: name.trim() || 'Friend',
          language,
          useElevenLabs,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCallResult(data.data);
        toast.success('Call initiated successfully! 🎉');
      } else {
        toast.error(data.error || 'Failed to initiate call');
      }
    } catch (error) {
      console.error('Test call error:', error);
      toast.error('Failed to initiate call. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingServices) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span>Checking service configuration...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Voice Call Testing</h1>
              <p className="text-muted-foreground">Test Awaz.ai voice calls with ElevenLabs and Twilio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Service Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Service Status</span>
              </CardTitle>
              <CardDescription>
                Current configuration status of voice services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviceStatus && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">ElevenLabs TTS</span>
                    <Badge variant={serviceStatus.services.elevenlabs.configured ? 'default' : 'destructive'}>
                      {serviceStatus.services.elevenlabs.configured ? 'Connected' : 'Not Configured'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Twilio Voice</span>
                    <Badge variant={serviceStatus.services.twilio.configured ? 'default' : 'destructive'}>
                      {serviceStatus.services.twilio.configured ? 'Connected' : 'Not Configured'}
                    </Badge>
                  </div>

                  {!serviceStatus.ready && (
                    <Alert>
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please configure your API keys in the environment variables to test voice calls.
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Test Call Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Test Voice Call</span>
              </CardTitle>
              <CardDescription>
                Enter details below to initiate a test call
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTestCall} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+911234567890 or 1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    className="text-base"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter with country code (+91 for India) or 10-digit number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="text-base"
                  />
                  <p className="text-sm text-muted-foreground">
                    Name to personalize the call (defaults to 'Friend')
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(LANGUAGES).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useElevenLabs"
                    checked={useElevenLabs}
                    onChange={(e) => setUseElevenLabs(e.target.checked)}
                    disabled={isLoading}
                    className="rounded"
                  />
                  <Label htmlFor="useElevenLabs" className="text-sm">
                    Use ElevenLabs for high-quality TTS (recommended)
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !serviceStatus?.ready}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Initiating Call...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-5 w-5" />
                      Start Test Call
                    </>
                  )}
                </Button>

                {!serviceStatus?.ready && (
                  <Alert>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      Voice services are not properly configured. Please check your environment variables.
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Call Result Card */}
          {callResult && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Call Initiated Successfully</span>
                </CardTitle>
                <CardDescription>
                  Your test call has been started. Check the phone for an incoming call.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Call SID:</span>
                    <p className="font-mono text-muted-foreground">{callResult.callSid}</p>
                  </div>
                  <div>
                    <span className="font-medium">Phone Number:</span>
                    <p className="text-muted-foreground">{callResult.phoneNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium">Name:</span>
                    <p className="text-muted-foreground">{callResult.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Language:</span>
                    <p className="text-muted-foreground">{LANGUAGES[callResult.language as keyof typeof LANGUAGES]}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Message:</span>
                    <p className="text-muted-foreground italic mt-1">{callResult.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}