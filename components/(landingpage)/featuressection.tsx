"use client";

import { motion } from "framer-motion";
import { 
  Mic2, Globe2, Zap, Shield, BarChart3, Clock, 
  Users, MessageCircle, Phone, Settings, Brain, Sparkles 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Mic2,
    title: "AI-Powered Voices",
    description: "Crystal-clear, natural-sounding voices powered by ElevenLabs. Indistinguishable from human speech.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.1
  },
  {
    icon: Globe2,
    title: "10+ Indian Languages",
    description: "Speak to customers in their native language - Hindi, Bengali, Tamil, Telugu, Marathi, and more.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.2
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Reach thousands of customers in minutes. No waiting, no delays - just instant voice communication.",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.3
  },
  {
    icon: Brain,
    title: "Smart Personalization",
    description: "Dynamic variables like {{name}}, {{amount}}, {{date}} make every call feel personal and relevant.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.4
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track delivery rates, call duration, and customer engagement with detailed insights and reports.",
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.5
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "Built-in DLT registration, opt-out handling, and TRAI compliance for worry-free campaigns.",
    gradient: "from-red-500 to-pink-500",
    delay: 0.6
  }
];

const highlights = [
  { icon: Clock, text: "99.9% Uptime" },
  { icon: Users, text: "50K+ Customers" },
  { icon: MessageCircle, text: "1M+ Calls Delivered" },
  { icon: Phone, text: "95% Success Rate" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Advanced AI</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Features That <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Transform</span> Communication
          </h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Experience the power of AI-driven voice technology designed specifically for Indian businesses and their unique communication needs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:bg-white/15 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-100 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-black" />
                  </div>
                  <div className="text-white font-semibold group-hover:text-yellow-300 transition-colors">
                    {highlight.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-black px-6 py-3 rounded-full font-semibold hover:from-yellow-300 hover:to-pink-300 transition-all duration-300 cursor-pointer group">
            <Settings className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Fully Customizable for Your Business</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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