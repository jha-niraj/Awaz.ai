import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using VoiceReach ("Service"), you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="mb-4">
              VoiceReach provides AI-powered voice outreach and messaging services for businesses in India and Nepal.
              Our service includes voice calls, SMS messaging, and automated communication sequences in multiple local
              languages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Credit System and Billing</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Voice calls are charged at $0.01 per minute (₹0.8 per minute)</li>
              <li>Messages are charged at $0.004 per message (₹0.3 per message)</li>
              <li>Credits are non-refundable and do not expire</li>
              <li>All prices are subject to change with 30 days notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
            <p className="mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Send spam, unsolicited, or bulk communications</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, abuse, or harm others</li>
              <li>Impersonate any person or entity</li>
              <li>Distribute malicious software or content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Protection and Privacy</h2>
            <p className="mb-4">
              We are committed to protecting your privacy and personal data. Please refer to our Privacy Policy for
              detailed information about how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
            <p className="mb-4">
              While we strive for 99.9% uptime, we do not guarantee uninterrupted service. We reserve the right to
              modify, suspend, or discontinue the service at any time with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              VoiceReach shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed by and construed in accordance with the laws of India, without regard to its
              conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
              <p>Email: legal@voicereach.ai</p>
              <p>Address: Mumbai, Maharashtra, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}