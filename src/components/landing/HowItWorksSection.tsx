import { Wallet, Search, ShoppingCart, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your MetaMask or WalletConnect wallet to get started. Secure and private.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse Properties",
    description: "Explore tokenized real estate from around the world. Filter by location, ROI, and more.",
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "Invest",
    description: "Purchase property tokens with crypto or fiat. Smart contracts handle everything.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Earn & Trade",
    description: "Collect rental yields and trade tokens anytime. Full liquidity, full control.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start investing in tokenized real estate in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="glass-card p-8 text-center hover-lift h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="font-display text-sm font-bold px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="font-display text-xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
