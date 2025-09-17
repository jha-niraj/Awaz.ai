import { Button } from "@/components/ui/button";
import { Check, Zap, MessageSquare, Phone, Sparkles } from "lucide-react";

export function PricingSection() {
  const creditRates = {
    voiceCall: { inr: 0.8, usd: 0.01 }, // per minute
    chat: { inr: 0.3, usd: 0.004 }, // per message
  };

  const creditPackages = [
    {
      name: "Starter Pack",
      credits: "1,000",
      price: "$12",
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
      name: "Growth Pack",
      credits: "5,000",
      price: "$50",
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
      name: "Business Pack",
      credits: "15,000",
      price: "$120",
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
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4 animate-slide-up">Simple Credit System</h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Pay only for what you use. Mix voice calls and messages as needed.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border hover:scale-105 transition-transform">
              <Phone className="h-5 w-5 text-foreground animate-pulse-glow" />
              <span className="text-sm">
                <strong>Voice Calls:</strong> $0.01/minute (₹0.8/minute)
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border hover:scale-105 transition-transform">
              <MessageSquare className="h-5 w-5 text-foreground animate-pulse-glow" />
              <span className="text-sm">
                <strong>Messages:</strong> $0.004/message (₹0.3/message)
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {creditPackages.map((pack, index) => (
            <div
              key={index}
              className={`relative bg-card/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-scale-in ${
                pack.popular
                  ? "border-primary/50 ring-2 ring-primary/20"
                  : "border-border"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1 animate-pulse-glow">
                    <Sparkles className="h-3 w-3" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground animate-pulse-glow">{pack.price}</span>
                  <span className="text-muted-foreground ml-2">({pack.originalPrice})</span>
                </div>
                <p className="text-lg font-semibold text-muted-foreground">{pack.credits} Credits</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pack.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: `${(index * 0.2) + (featureIndex * 0.05)}s` }}>
                    <Check className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5 animate-pulse-glow" />
                    <span className="text-sm text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full transition-all duration-300 hover:scale-105 ${
                  pack.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
                size="lg"
              >
                Get {pack.credits} Credits
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-4">Need more credits? Contact us for custom packages.</p>
          <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
            <Zap className="h-4 w-4 mr-2 animate-pulse-glow" />
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}