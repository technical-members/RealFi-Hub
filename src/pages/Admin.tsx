import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Shield,
  Users,
  Building2,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Code2,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Helmet } from "react-helmet-async";

const pendingVerifications = [
  {
    id: 1,
    name: "John Smith",
    type: "KYC",
    status: "pending",
    submitted: "2 hours ago",
    documents: ["ID", "Proof of Address"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    type: "AML",
    status: "review",
    submitted: "5 hours ago",
    documents: ["Bank Statement", "Tax Return"],
  },
  {
    id: 3,
    name: "Dubai Marina Tower",
    type: "Property",
    status: "pending",
    submitted: "1 day ago",
    documents: ["Title Deed", "Valuation"],
  },
];

const smartContracts = [
  {
    name: "PropertyToken.sol",
    status: "deployed",
    network: "Polygon",
    address: "0x1a2b...3c4d",
  },
  {
    name: "Escrow.sol",
    status: "deployed",
    network: "Polygon",
    address: "0x5e6f...7g8h",
  },
  {
    name: "RentalPool.sol",
    status: "pending",
    network: "Ethereum",
    address: "—",
  },
  {
    name: "Governance.sol",
    status: "deployed",
    network: "Polygon",
    address: "0x9i0j...1k2l",
  },
];

const recentActivity = [
  { action: "User Verified", user: "0x1a2b...3c4d", time: "5 min ago" },
  {
    action: "Property Approved",
    user: "Manhattan Penthouse",
    time: "1 hour ago",
  },
  { action: "Contract Deployed", user: "RentalPool v2", time: "3 hours ago" },
  { action: "KYC Rejected", user: "0x5e6f...7g8h", time: "5 hours ago" },
];

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Panel - RealFi Hub</title>
        <meta
          name="description"
          content="Manage users, verify properties, and monitor smart contract deployments on RealFi Hub."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive to-secondary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold">
                    Admin Panel
                  </h1>
                  <p className="text-muted-foreground">
                    Platform management and verification
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Pending KYC
                </p>
                <p className="font-display text-2xl font-bold">23</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Verified Users
                </p>
                <p className="font-display text-2xl font-bold">12,456</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Properties Pending
                </p>
                <p className="font-display text-2xl font-bold">8</p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Active Contracts
                </p>
                <p className="font-display text-2xl font-bold">156</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Verification Queue */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">
                    Verification Queue
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {pendingVerifications.map((item) => (
                    <div key={item.id} className="glass-card p-5 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.type === "KYC"
                                ? "bg-primary/10"
                                : item.type === "AML"
                                ? "bg-secondary/10"
                                : "bg-accent/10"
                            }`}
                          >
                            {item.type === "Property" ? (
                              <Building2 className="w-5 h-5" />
                            ) : (
                              <Users className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.type} Verification
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                              : "bg-secondary/10 text-secondary border-secondary/30"
                          }
                        >
                          {item.status === "pending" ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <FileCheck className="w-3 h-3 mr-1" />
                          )}
                          {item.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        {item.documents.map((doc, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-md bg-muted/50"
                          >
                            {doc}
                          </span>
                        ))}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {item.submitted}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="hero" size="sm" className="flex-1">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Smart Contracts */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    Smart Contract Monitor
                  </h3>
                  <div className="space-y-3">
                    {smartContracts.map((contract, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/20"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              contract.status === "deployed"
                                ? "bg-primary"
                                : "bg-yellow-500"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {contract.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {contract.network}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              contract.status === "deployed"
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                            }
                          >
                            {contract.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {contract.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-secondary" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-3 border-b border-glass-border/20 last:border-0"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.action.includes("Rejected")
                              ? "bg-destructive"
                              : activity.action.includes("Verified") ||
                                activity.action.includes("Approved")
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.user}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    System Health
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          API Uptime
                        </span>
                        <span className="font-medium text-primary">99.9%</span>
                      </div>
                      <Progress value={99.9} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Blockchain Sync
                        </span>
                        <span className="font-medium text-primary">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Storage Used
                        </span>
                        <span className="font-medium">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="w-4 h-4 mr-2" />
                      Property Queue
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Code2 className="w-4 h-4 mr-2" />
                      Deploy Contract
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      View Alerts
                    </Button>
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

export default Admin;
