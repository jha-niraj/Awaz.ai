"use client";

import { motion } from "framer-motion";
import { Phone, Upload, MessageSquare, BarChart3, Mic, Zap, Globe, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Contacts",
    description: "Import your customer list via CSV, Excel, or connect directly to Google Sheets. No technical skills required.",
    color: "from-blue-500 to-blue-600",
    delay: 0.1
  },
  {
    step: "02", 
    icon: MessageSquare,
    title: "Create Your Message",
    description: "Write a simple script with personalization like {{name}} and {{amount}}. Choose from pre-made templates or create your own.",
    color: "from-purple-500 to-purple-600",
    delay: 0.2
  },
  {
    step: "03",
    icon: Mic,
    title: "Select Voice & Language",
    description: "Choose from 10+ Indian languages with crystal-clear AI voices. Perfect pronunciation in Hindi, Tamil, Bengali and more.",
    color: "from-green-500 to-green-600",
    delay: 0.3
  },
  {
    step: "04",
    icon: Phone,
    title: "Launch Your Campaign",
    description: "Hit send and watch as hundreds of personalized calls are delivered instantly. Real-time tracking shows every call status.",
    color: "from-orange-500 to-orange-600",
    delay: 0.4
  },
];

const stats = [
  { icon: Users, number: "50K+", label: "Calls Delivered" },
  { icon: Globe, number: "10+", label: "Languages" },
  { icon: Zap, number: "95%", label: "Success Rate" },
  { icon: BarChart3, number: "3x", label: "Better Response" },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
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
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            How <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Awaz.ai</span> Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From upload to delivery in minutes. Transform how you communicate with customers using the power of AI voice technology.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {steps.map((stepItem, index) => {
            const IconComponent = stepItem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stepItem.delay }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0" />
                )}
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500 group-hover:border-indigo-200 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{stepItem.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stepItem.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to transform your customer communication?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using AI-powered voice calls to boost engagement and drive results.
          </p>
          <Link href="/test-call">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              Start Your First Campaign
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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