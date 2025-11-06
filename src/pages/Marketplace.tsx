import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyModal } from "@/components/properties/PropertyModal";
import { properties, Property } from "@/data/properties";
import { Building2, Grid3X3, Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

type ViewMode = "grid" | "list";

const Marketplace = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <>
      <Helmet>
        <title>Property Marketplace - RealFi Hub</title>
        <meta
          name="description"
          content="Browse tokenized real estate properties worldwide. Invest in residential, commercial, and fractional properties with blockchain security."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold">
                    Property Marketplace
                  </h1>
                  <p className="text-muted-foreground">
                    Discover tokenized real estate opportunities
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-6 py-4 px-6 glass-card rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Properties
                  </p>
                  <p className="font-display text-2xl font-bold">
                    {properties.length}
                  </p>
                </div>
                <div className="h-12 w-px bg-glass-border/30" />
                <div>
                  <p className="text-sm text-muted-foreground">Tokenized</p>
                  <p className="font-display text-2xl font-bold text-primary">
                    {properties.filter((p) => p.tokenized).length}
                  </p>
                </div>
                <div className="h-12 w-px bg-glass-border/30" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg. ROI</p>
                  <p className="font-display text-2xl font-bold text-secondary">
                    12.4%
                  </p>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <PropertyFilters />

            {/* Properties Grid */}
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-slide-up opacity-0"
                  style={{
                    animationFillMode: "forwards",
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <PropertyCard
                    {...property}
                    onClick={() => handlePropertyClick(property)}
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />

        {/* Property Modal */}
        {selectedProperty && (
          <PropertyModal
            isOpen={!!selectedProperty}
            onClose={() => setSelectedProperty(null)}
            property={selectedProperty}
          />
        )}
      </div>
    </>
  );
};

export default Marketplace;
