import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Sparkles, Zap, Globe, Bot } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const countries = [
    { code: "IN", name: "India", dialCode: "+91" },
    { code: "NP", name: "Nepal", dialCode: "+977" },
    { code: "OTHER", name: "Other", dialCode: "+" },
  ];

  const handleGetCall = () => {
    // Store the form data for pre-filling the test page
    if (typeof window !== 'undefined') {
      const formData = { name, country, phoneNumber };
      sessionStorage.setItem('demoCallData', JSON.stringify(formData));
    }
    console.log("Demo call requested:", { name, country, phoneNumber });
  };

  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-muted/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-muted/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-muted/10 to-muted/5 rounded-full blur-3xl animate-rotate-slow" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Content */}
        <div className="space-y-12 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground animate-scale-in">
            <Bot className="h-4 w-4 animate-pulse-glow" />
            <span>AI Voice Outreach for Local Businesses</span>
          </div>

          {/* Headline */}
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
              Smart{" "}
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent animate-pulse-glow">
                Outreach
              </span>
              <br />
              <span className="text-muted-foreground animate-slide-in-right">Built for India</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Create personalized voice sequences, SMS campaigns & automated reminders in local languages — fast, affordable, and fully automated.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border hover:scale-105 transition-transform">
              <Globe className="h-5 w-5 text-foreground animate-pulse-glow" />
              <span className="text-sm font-medium">10+ Local Languages</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 text-foreground animate-pulse-glow" />
              <span className="text-sm font-medium">AI-Powered Personalization</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-foreground animate-pulse-glow" />
              <span className="text-sm font-medium">No Coding Required</span>
            </div>
          </div>

          {/* Demo Form */}
          <div className="max-w-2xl mx-auto mt-16 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-8 space-y-6 shadow-2xl hover:shadow-3xl transition-shadow">
              <h3 className="text-2xl font-semibold text-foreground animate-pulse-glow">Try a Free Voice Call</h3>
              
              <div className="space-y-4">
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-base"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <div className="flex items-center space-x-2">
                            <span>{c.name}</span>
                            <span className="text-muted-foreground">{c.dialCode}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex">
                    {country && (
                      <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0">
                        <span className="text-sm font-medium">
                          {countries.find((c) => c.code === country)?.dialCode}
                        </span>
                      </div>
                    )}
                    <Input
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`h-12 text-base ${country ? "rounded-l-none" : ""}`}
                    />
                  </div>
                </div>

                <Link href={!name || !country || !phoneNumber ? "#" : "/test-call"} className="w-full">
                  <Button
                    size="lg"
                    className="w-full h-12 text-base hover:scale-105 transition-transform animate-pulse-glow"
                    onClick={handleGetCall}
                    disabled={!name || !country || !phoneNumber}
                  >
                    <Phone className="h-5 w-5 mr-2 animate-float" />
                    Get a Call
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Free demo call • No commitment • Available in your local language
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-center group">
              <div className="text-4xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow">50K+</div>
              <div className="text-muted-foreground">Calls Delivered</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow">10</div>
              <div className="text-muted-foreground">Languages</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </