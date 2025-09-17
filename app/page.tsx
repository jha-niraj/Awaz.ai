"use client";

import * as React from "react";
import { Github, Shield, Zap, Code2, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/(landingpage)/herosection"

export default function App() {

	return (
		<main className="h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50 relative overflow-hidden">
			<HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <PricingSection />
            <ContactSection />
		</main>
	);
}