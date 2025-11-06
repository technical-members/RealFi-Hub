import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Users,
  TrendingUp,
  Wallet,
  Building2,
  ArrowUpRight,
  Clock,
  DollarSign,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Helmet } from "react-helmet-async";

const investorPools = [
  {
    name: "Manhattan Premium Pool",
    totalValue: "$2.4M",
    investors: 156,
    minInvestment: "$1,000",
    expectedROI: "14.5%",
    filled: 78,
    type: "Residential",
  },
  {
    name: "Commercial Real Estate Fund",
    totalValue: "$8.2M",
    investors: 312,
    minInvestment: "$5,000",
    expectedROI: "16.2%",
    filled: 92,
    type: "Commercial",
  },
  {
    name: "Global Diversified Portfolio",
    totalValue: "$5.6M",
    investors: 445,
    minInvestment: "$500",
    expectedROI: "11.8%",
    filled: 65,
    type: "Mixed",
  },
];

const topInvestors = [
  {
    rank: 1,
    address: "0x1a2b...3c4d",
    invested: "$245,000",
    properties: 12,
    roi: "+18.5%",
  },
  {
    rank: 2,
    address: "0x5e6f...7g8h",
    invested: "$198,000",
    properties: 8,
    roi: "+15.2%",
  },
  {
    rank: 3,
    address: "0x9i0j...1k2l",
    invested: "$156,000",
    properties: 15,
    roi: "+14.8%",
  },
  {
    rank: 4,
    address: "0xm3n4...5o6p",
    invested: "$124,000",
    properties: 6,
    roi: "+12.3%",
  },
  {
    rank: 5,
    address: "0xq7r8...9s0t",
    invested: "$98,000",
    properties: 10,
    roi: "+11.5%",
  },
];

const Investors = () => {
  return (
    <>
      <Helmet>
        <title>Investor Hub - RealFi Hub</title>
        <meta
          name="description"
          content="Join investment pools, explore opportunities, and track performance across tokenized real estate portfolios."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold">
                    Investor Hub
                  </h1>
                  <p className="text-muted-foreground">
                    Investment pools and community analytics
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-primary flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +2.4K
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Investors
                </p>
                <p className="font-display text-2xl font-bold">89,245</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Invested
                </p>
                <p className="font-display text-2xl font-bold">$2.4B</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Avg. Pool ROI
                </p>
                <p className="font-display text-2xl font-bold gradient-text">
                  14.2%
                </p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Active Pools
                </p>
                <p className="font-display text-2xl font-bold">24</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Investment Pools */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">
                    Featured Investment Pools
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All Pools
                  </Button>
                </div>

                <div className="space-y-4">
                  {investorPools.map((pool, index) => (
                    <div key={index} className="glass-card p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display text-lg font-semibold">
                            {pool.name}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {pool.type}
                          </span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {pool.expectedROI} APY
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Total Value
                          </p>
                          <p className="font-semibold">{pool.totalValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Investors
                          </p>
                          <p className="font-semibold">{pool.investors}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Min. Investment
                          </p>
                          <p className="font-semibold">{pool.minInvestment}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">
                            Pool Capacity
                          </span>
                          <span className="font-medium">{pool.filled}%</span>
                        </div>
                        <Progress value={pool.filled} className="h-2" />
                      </div>

                      <Button variant="hero" size="sm" className="w-full">
                        Join Pool
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Top Investors
                  </h3>
                  <div className="space-y-3">
                    {topInvestors.map((investor, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            investor.rank === 1
                              ? "bg-yellow-500/20 text-yellow-500"
                              : investor.rank === 2
                              ? "bg-gray-400/20 text-gray-400"
                              : investor.rank === 3
                              ? "bg-orange-500/20 text-orange-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {investor.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {investor.address}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {investor.properties} properties
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {investor.invested}
                          </p>
                          <p className="text-xs text-primary">{investor.roi}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Pool Analytics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Avg. Lock Period
                        </span>
                      </div>
                      <span className="font-semibold">12 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Best Performer
                        </span>
                      </div>
                      <span className="font-semibold text-primary">+22.4%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Distributed
                        </span>
                      </div>
                      <span className="font-semibold">$145M</span>
                    </div>
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

export default Investors;
