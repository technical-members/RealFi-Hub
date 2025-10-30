import { Coins, Lock, Globe2, BarChart3, FileCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Fractional Ownership",
    description:
      "Own a piece of premium real estate with as little as $100. Diversify your portfolio across multiple properties.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Lock,
    title: "Smart Contract Escrow",
    description:
      "Automated, trustless transactions secured by blockchain technology. Your funds are protected at every step.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Globe2,
    title: "Global Access",
    description:
      "Invest in properties worldwide without geographical restrictions. True borderless real estate investment.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: BarChart3,
    title: "Passive Income",
    description:
      "Earn rental yields distributed directly to your wallet. Automatic, transparent revenue sharing.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: FileCheck,
    title: "Verified Properties",
    description:
      "Every property undergoes rigorous verification. Legal documents, valuations, and titles on-chain.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Zap,
    title: "Instant Liquidity",
    description:
      "Trade your property tokens 24/7 on our decentralized exchange. No lockups, no waiting periods.",
    gradient: "from-accent to-primary",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-elevated/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Why <span className="gradient-text">RealFi Hub</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Revolutionizing real estate investment through blockchain
            technology. Secure, transparent, and accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group glass-card p-8 hover-lift cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
