"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Zap, MessageSquare, Phone, Calculator } from "lucide-react"
import Link from "next/link"

export default function PurchasePage() {
  const [customCredits, setCustomCredits] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const creditRates = {
    voiceCall: { inr: 0.8, usd: 0.01 }, // per minute
    chat: { inr: 0.3, usd: 0.004 }, // per message
  }

  const calculateCustomPrice = (credits: number) => {
    const baseRate = 0.01 // $0.01 per credit
    return (credits * baseRate).toFixed(2)
  }

  const creditPackages = [
    {
      id: "starter",
      name: "Starter Pack",
      credits: 1000,
      price: 12,
      originalPrice: "₹999",
      features: [
        "1,000 credits included",
        "~1,250 minutes of voice calls",
        "~3,300 chat messages",
        "Mix and match as needed",
        "5 local languages",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      id: "growth",
      name: "Growth Pack",
      credits: 5000,
      price: 50,
      originalPrice: "₹4,199",
      features: [
        "5,000 credits included",
        "~6,250 minutes of voice calls",
        "~16,600 chat messages",
        "Mix and match as needed",
        "All 10 languages",
        "Advanced analytics",
        "Priority support",
        "CRM integrations",
      ],
      popular: true,
    },
    {
      id: "business",
      name: "Business Pack",
      credits: 15000,
      price: 120,
      originalPrice: "₹9,999",
      features: [
        "15,000 credits included",
        "~18,750 minutes of voice calls",
        "~50,000 chat messages",
        "Mix and match as needed",
        "Custom integrations",
        "Dedicated support",
        "Custom voice training",
        "Priority delivery",
      ],
    },
  ]

  const handlePurchase = (packageId: string, credits: number, price: number) => {
    // Navigate to checkout with package details
    const params = new URLSearchParams({
      type: packageId === "custom" ? "custom" : "package",
      packageId: packageId,
      credits: credits.toString(),
      price: price.toString(),
    })
    window.location.href = `/checkout?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Purchase Credits</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect credit package for your business needs</p>
        </div>

        {/* Custom Credit Purchase */}
        <Card className="mb-12 border-2 border-neutral-200 dark:border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Custom Credit Purchase</span>
            </CardTitle>
            <CardDescription>
              Purchase exactly the number of credits you need. Perfect for specific campaigns or budget requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Credits</label>
                  <Input
                    type="number"
                    placeholder="Enter credits (minimum 100)"
                    value={customCredits}
                    onChange={(e) => setCustomCredits(e.target.value)}
                    className="h-12 text-lg"
                    min="100"
                  />
                </div>

                {customCredits && Number.parseInt(customCredits) >= 100 && (
                  <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What you get:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • ~{Math.floor(Number.parseInt(customCredits) * 1.25).toLocaleString()} minutes of voice calls
                      </li>
                      <li>• ~{Math.floor(Number.parseInt(customCredits) * 3.33).toLocaleString()} chat messages</li>
                      <li>• Mix and match as needed</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                {customCredits && Number.parseInt(customCredits) >= 100 && (
                  <div className="text-center p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg">
                    <div className="text-3xl font-bold mb-2">
                      ${calculateCustomPrice(Number.parseInt(customCredits))}
                    </div>
                    <div className="text-muted-foreground mb-4">
                      {Number.parseInt(customCredits).toLocaleString()} credits
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900"
                      onClick={() =>
                        handlePurchase(
                          "custom",
                          Number.parseInt(customCredits),
                          Number.parseFloat(calculateCustomPrice(Number.parseInt(customCredits))),
                        )
                      }
                    >
                      Purchase Custom Credits
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pre-configured Packages */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Pre-configured Packages</h2>
          <p className="text-muted-foreground mb-8">
            Popular credit packages with additional features and better value
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {creditPackages.map((pack) => (
            <Card
              key={pack.id}
              className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                pack.popular
                  ? "border-2 border-neutral-800 dark:border-neutral-200 ring-2 ring-neutral-800/20 dark:ring-neutral-200/20"
                  : "border border-border"
              } ${selectedPackage === pack.id ? "ring-2 ring-neutral-500" : ""}`}
              onClick={() => setSelectedPackage(pack.id)}
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pack.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">${pack.price}</span>
                  <span className="text-muted-foreground ml-2">({pack.originalPrice})</span>
                </div>
                <CardDescription className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                  {pack.credits.toLocaleString()} Credits
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full transition-all duration-300 ${
                    pack.popular
                      ? "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-100"
                  }`}
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePurchase(pack.id, pack.credits, pack.price)
                  }}
                >
                  Purchase {pack.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Credit Usage Information */}
        <div className="mt-16 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">How Credits Work</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-neutral-900 dark:bg-neutral-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-white dark:text-neutral-900" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Voice Calls</h4>
                <p className="text-muted-foreground mb-2">$0.01 per minute (₹0.8 per minute)</p>
                <p className="text-sm">Perfect for personal outreach, appointment reminders, and follow-ups</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-neutral-900 dark:bg-neutral-100 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white dark:text-neutral-900" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Messages</h4>
                <p className="text-muted-foreground mb-2">$0.004 per message (₹0.3 per message)</p>
                <p className="text-sm">Great for bulk notifications, promotions, and quick updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}