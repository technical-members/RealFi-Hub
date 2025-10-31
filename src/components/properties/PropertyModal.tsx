import { useState } from "react";
import { X, MapPin, Bed, Bath, Square, TrendingUp, Coins, Shield, FileText, History, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TransactionButton } from "@/components/wallet/TransactionButton";
import { useWalletAuth } from "@/hooks/useWalletAuth";

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    image: string;
    title: string;
    location: string;
    price: string;
    tokenPrice: string;
    roi: string;
    beds: number;
    baths: number;
    sqft: number;
    tokenized: boolean;
    type: "residential" | "commercial" | "fractional";
    description?: string;
    totalTokens?: number;
    availableTokens?: number;
    stakingYield?: string;
  };
}

const escrowSteps = [
  { id: 1, label: "Token Purchase", status: "completed" },
  { id: 2, label: "Smart Contract Lock", status: "completed" },
  { id: 3, label: "Verification", status: "active" },
  { id: 4, label: "Ownership Transfer", status: "pending" },
];

export function PropertyModal({ isOpen, onClose, property }: PropertyModalProps) {
  const [selectedTokens, setSelectedTokens] = useState(10);

  if (!isOpen) return null;

  const totalTokens = property.totalTokens || 10000;
  const availableTokens = property.availableTokens || 7500;
  const soldPercentage = ((totalTokens - availableTokens) / totalTokens) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold mb-1">{property.title}</h2>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">{property.roi} ROI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-muted/30 p-1 rounded-xl mb-6">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Overview
              </TabsTrigger>
              <TabsTrigger value="tokenization" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Tokenization
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Documents
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                History
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Property Details */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold">Property Details</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass p-4 rounded-xl text-center">
                      <Bed className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{property.beds}</p>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                    </div>
                    <div className="glass p-4 rounded-xl text-center">
                      <Bath className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{property.baths}</p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                    <div className="glass p-4 rounded-xl text-center">
                      <Square className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{property.sqft}</p>
                      <p className="text-xs text-muted-foreground">Sq. Ft.</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {property.description || "This stunning property offers modern amenities and prime location. Fully verified on-chain with complete documentation and legal title transfer."}
                  </p>
                </div>

                {/* Investment Card */}
                <div className="glass p-6 rounded-xl space-y-4">
                  <h3 className="font-display text-lg font-semibold">Investment Details</h3>
                  
                  <div className="flex justify-between items-center py-3 border-b border-glass-border/20">
                    <span className="text-muted-foreground">Property Value</span>
                    <span className="font-display text-xl font-bold">{property.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-glass-border/20">
                    <span className="text-muted-foreground">Token Price</span>
                    <span className="font-semibold text-primary">{property.tokenPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-glass-border/20">
                    <span className="text-muted-foreground">Staking Yield</span>
                    <span className="font-semibold text-secondary">{property.stakingYield || "8.5% APY"}</span>
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    <Coins className="w-4 h-4 mr-2" />
                    Invest Now
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Tokenization Tab */}
            <TabsContent value="tokenization" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Token Distribution */}
                <div className="glass p-6 rounded-xl space-y-4">
                  <h3 className="font-display text-lg font-semibold">Token Distribution</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tokens Sold</span>
                      <span className="font-medium">{totalTokens - availableTokens} / {totalTokens}</span>
                    </div>
                    <Progress value={soldPercentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{soldPercentage.toFixed(1)}% Sold</span>
                      <span>{availableTokens} Available</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Token Standard</p>
                      <p className="font-semibold">ERC-20</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Blockchain</p>
                      <p className="font-semibold">Polygon</p>
                    </div>
                  </div>
                </div>

                {/* Buy Tokens */}
                <div className="glass p-6 rounded-xl space-y-4">
                  <h3 className="font-display text-lg font-semibold">Purchase Tokens</h3>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Number of Tokens</label>
                    <input
                      type="number"
                      value={selectedTokens}
                      onChange={(e) => setSelectedTokens(Number(e.target.value))}
                      min={1}
                      max={availableTokens}
                      className="w-full h-12 px-4 rounded-xl bg-muted/30 border border-glass-border/30 focus:border-primary/50 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-glass-border/20">
                    <span className="text-muted-foreground">Total Cost</span>
                    <span className="font-display text-xl font-bold">
                      ${(selectedTokens * 100).toLocaleString()}
                    </span>
                  </div>

                  <TransactionButton className="w-full" amount="0.001">
                    Purchase {selectedTokens} Tokens
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </TransactionButton>
                </div>
              </div>

              {/* Escrow Timeline */}
              <div className="glass p-6 rounded-xl">
                <h3 className="font-display text-lg font-semibold mb-4">Smart Contract Escrow</h3>
                <div className="flex items-center justify-between">
                  {escrowSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                          step.status === "completed" 
                            ? "bg-primary border-primary text-primary-foreground"
                            : step.status === "active"
                            ? "bg-secondary/20 border-secondary text-secondary animate-pulse"
                            : "bg-muted border-muted-foreground/30 text-muted-foreground"
                        )}>
                          {step.status === "completed" ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-semibold">{step.id}</span>
                          )}
                        </div>
                        <p className={cn(
                          "text-xs mt-2 text-center max-w-[80px]",
                          step.status === "active" ? "text-secondary font-medium" : "text-muted-foreground"
                        )}>
                          {step.label}
                        </p>
                      </div>
                      {index < escrowSteps.length - 1 && (
                        <div className={cn(
                          "flex-1 h-0.5 mx-2",
                          step.status === "completed" ? "bg-primary" : "bg-muted"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              {[
                { name: "Property Title Deed", verified: true, date: "Dec 1, 2024" },
                { name: "Legal Verification Report", verified: true, date: "Nov 28, 2024" },
                { name: "Property Valuation", verified: true, date: "Nov 25, 2024" },
                { name: "Smart Contract Audit", verified: true, date: "Nov 20, 2024" },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.verified && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              {[
                { action: "Token Sale", amount: "500 tokens", wallet: "0x1a2b...3c4d", date: "2 hours ago" },
                { action: "Price Update", amount: "$102 → $105", wallet: "System", date: "1 day ago" },
                { action: "Token Sale", amount: "1,200 tokens", wallet: "0x5e6f...7g8h", date: "3 days ago" },
                { action: "Listed on DEX", amount: "10,000 tokens", wallet: "0x9i0j...1k2l", date: "1 week ago" },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <History className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{event.wallet}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{event.amount}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
