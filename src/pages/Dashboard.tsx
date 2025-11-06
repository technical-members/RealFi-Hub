import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Building2,
  Wallet,
  TrendingUp,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Helmet } from "react-helmet-async";

const portfolioProperties = [
  {
    name: "Luxury Penthouse Manhattan",
    tokens: 150,
    value: "$36,750",
    roi: "+12.5%",
    positive: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80",
  },
  {
    name: "Modern Villa Miami",
    tokens: 80,
    value: "$14,800",
    roi: "+8.2%",
    positive: true,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80",
  },
  {
    name: "Downtown Office Tower",
    tokens: 25,
    value: "$38,000",
    roi: "+15.8%",
    positive: true,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80",
  },
];

const recentTransactions = [
  {
    type: "Rental Income",
    amount: "+$1,245",
    date: "Today",
    property: "Manhattan Penthouse",
  },
  {
    type: "Token Purchase",
    amount: "-$5,000",
    date: "Yesterday",
    property: "Miami Villa",
  },
  {
    type: "Rental Income",
    amount: "+$890",
    date: "Dec 3",
    property: "Office Tower",
  },
  {
    type: "Staking Reward",
    amount: "+$156",
    date: "Dec 2",
    property: "All Properties",
  },
];

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Owner Dashboard - RealFi Hub</title>
        <meta
          name="description"
          content="Manage your tokenized real estate portfolio. Track investments, rental income, and property performance."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">
                Owner Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your real estate portfolio
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-primary flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +12.5%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Portfolio Value
                </p>
                <p className="font-display text-2xl font-bold">$89,550</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    255 tokens
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Tokens
                </p>
                <p className="font-display text-2xl font-bold">3 Properties</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm text-primary flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +8.5%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Monthly Income
                </p>
                <p className="font-display text-2xl font-bold">$2,135</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Avg.</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Annual ROI</p>
                <p className="font-display text-2xl font-bold gradient-text">
                  11.8%
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Portfolio Properties */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">
                    Your Properties
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {portfolioProperties.map((property, index) => (
                    <div
                      key={index}
                      className="glass-card p-4 flex items-center gap-4 hover-lift"
                    >
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {property.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {property.tokens} tokens
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{property.value}</p>
                        <p
                          className={`text-sm flex items-center justify-end gap-1 ${
                            property.positive
                              ? "text-primary"
                              : "text-destructive"
                          }`}
                        >
                          {property.positive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {property.roi}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Revenue Chart Placeholder */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Revenue Overview
                  </h3>
                  <div className="h-48 flex items-center justify-center border border-glass-border/20 rounded-xl">
                    <div className="text-center text-muted-foreground">
                      <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Revenue chart visualization</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Rental Income Distribution */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Income Distribution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Rental Yield
                        </span>
                        <span className="font-medium">$1,580</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Staking Rewards
                        </span>
                        <span className="font-medium">$420</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Capital Gains
                        </span>
                        <span className="font-medium">$135</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentTransactions.map((tx, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-glass-border/20 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-sm">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {tx.property}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold text-sm ${
                              tx.amount.startsWith("+")
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {tx.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {tx.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
