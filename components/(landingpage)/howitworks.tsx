import { Upload, Edit, Play, Zap, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Prepare your audience",
      description: "Upload contacts from CSV or connect your CRM (Google Sheets / Zapier).",
      details: "Import customer data with names, numbers, and context for personalized outreach sequences.",
    },
    {
      icon: Edit,
      title: "Create your sequence",
      description: "Use templates or write your own script; select language & voice.",
      details: "Design voice messages, SMS, and follow-up workflows that feel natural and personal.",
    },
    {
      icon: Play,
      title: "Launch & track",
      description: "Schedule your outreach sequence, track delivery and engagement in real time.",
      details: "Monitor performance, response rates, and optimize your sequences for better results.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
            <Zap className="h-4 w-4 animate-pulse-glow" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4 animate-slide-up">Launch Your First Outreach Sequence</h2>
          <p className="text-xl text-muted-foreground text-pretty animate-slide-up" style={{ animationDelay: '0.2s' }}>
            From contact upload to live delivery in under 10 minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-card rounded-xl p-8 shadow-lg border border-border h-full hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-primary/20">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold animate-pulse-glow">
                  {index + 1}
                </div>

                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary/20 transition-colors animate-float">
                  <step.icon className="h-8 w-8 text-primary animate-pulse-glow" />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-balance">{step.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed mb-4">{step.description}</p>
                <p className="text-sm text-muted-foreground/80 text-pretty leading-relaxed">{step.details}</p>
              </div>

              {/* Step connector with animation */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/30 transform -translate-y-1/2 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
              <Target className="h-5 w-5 mr-2 animate-float" />
              Start Your First Sequence
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
              <BarChart3 className="h-5 w-5 mr-2 animate-pulse-glow" />
              View API Documentation
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Free trial includes 100 credits • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}