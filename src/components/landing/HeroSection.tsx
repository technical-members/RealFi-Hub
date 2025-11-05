import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Sparkles,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/15 rounded-full blur-[100px] animate-pulse-glow delay-2000" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="glass-card p-4 rounded-2xl">
            {/* <Building2 className="w-8 h-8 text-primary" /> */}
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <div className="glass-card p-4 rounded-2xl">
            {/* <TrendingUp className="w-8 h-8 text-secondary" /> */}
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-float delay-500">
          <div className="glass-card p-4 rounded-2xl">
            <Shield className="w-8 h-8 text-accent" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              The Future of Real Estate Investment
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up opacity-0 delay-100"
            style={{ animationFillMode: "forwards" }}
          >
            <span className="text-foreground">Real Estate Meets</span>
            <br />
            <span className="gradient-text">DeFi</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up opacity-0 delay-200 text-balance"
            style={{ animationFillMode: "forwards" }}
          >
            Tokenized. Transparent. Decentralized.
            <br className="hidden sm:block" />
            Invest in premium properties with blockchain security.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0 delay-300"
            style={{ animationFillMode: "forwards" }}
          >
            <Link to="/marketplace">
              <Button variant="hero" size="xl" className="group">
                Explore Properties
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="hero-outline" size="xl">
              Connect Wallet
            </Button>
          </div>

          {/* Stats Row */}
          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up opacity-0 delay-400"
            style={{ animationFillMode: "forwards" }}
          >
            {[
              { value: "$2.4B+", label: "Total Value Locked" },
              { value: "12,500+", label: "Properties Tokenized" },
              { value: "89,000+", label: "Active Investors" },
              { value: "15.4%", label: "Avg. Annual ROI" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 hover-lift">
                <div className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
