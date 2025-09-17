import { Shield, Brain, Globe, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    "Multi-language TTS (Indian languages + Nepali + Spanish)",
    "AI-powered personalization: auto-insert name, dates, order IDs",
    "Smart scheduling & retries to maximize reach",
    "Real-time delivery & call status tracking with analytics",
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4 animate-slide-up">Features merchants love</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features list */}
          <div className="space-y-6 animate-slide-in-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-1 animate-pulse-glow">
                  <div className="w-2 h-2 bg-primary rounded-full animate-float" />
                </div>
                <p className="text-lg text-pretty leading-relaxed">{feature}</p>
              </div>
            ))}

            <div className="mt-8 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="font-medium">Privacy & Consent</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                All outreach requires explicit consent — built-in opt-out functionality.
              </p>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-border animate-slide-in-right hover:shadow-2xl transition-shadow">
            <div className="bg-background rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Brain className="h-4 w-4 animate-pulse-glow" />
                  <span>AI Campaign Dashboard</span>
                </h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Calls</span>
                  <span className="font-medium animate-pulse-glow">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Delivered</span>
                  <span className="font-medium text-green-600 animate-pulse-glow">2,703 (95%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Answered</span>
                  <span className="font-medium text-blue-600 animate-pulse-glow">1,892 (70%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Languages</span>
                  <span className="font-medium">Hindi, Tamil, English</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-primary/10 rounded p-2 text-center hover:scale-105 transition-transform">
                <div className="text-xs text-muted-foreground">Active</div>
                <div className="font-semibold text-primary animate-pulse-glow">156</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded p-2 text-center hover:scale-105 transition-transform">
                <div className="text-xs text-muted-foreground">Complete</div>
                <div className="font-semibold text-green-600 animate-pulse-glow">2,547</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded p-2 text-center hover:scale-105 transition-transform">
                <div className="text-xs text-muted-foreground">Pending</div>
                <div className="font-semibold text-yellow-600 animate-pulse-glow">144</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}