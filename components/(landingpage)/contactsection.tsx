import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    message: "",
    preferredLanguage: "",
    hasConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasConsent) {
      alert("Please confirm you have consent to message your contacts.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({
        name: "",
        business: "",
        phone: "",
        message: "",
        preferredLanguage: "",
        hasConsent: false,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get Started
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to transform your business communication? Let's talk.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Business */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business">Business Name *</Label>
                <Input
                  id="business"
                  required
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  placeholder="Enter your business name"
                  className="h-12"
                />
              </div>
            </div>

            {/* Phone and Language */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select
                  value={formData.preferredLanguage}
                  onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                    <SelectItem value="nepali">Nepali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your business and how we can help..."
                rows={4}
              />
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={formData.hasConsent}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, hasConsent: checked as boolean })
                }
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed">
                I confirm I have consent to message these contacts when sending campaigns.
              </Label>
            </div>

            {/* Privacy Notice */}
            <p className="text-xs text-muted-foreground">
              We will only use your contact for campaign setup and follow-up. 
              By submitting you consent to receive a response.
            </p>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting} 
              className="w-full h-12"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}