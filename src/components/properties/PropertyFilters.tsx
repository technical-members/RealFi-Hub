import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, DollarSign, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PropertyFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  propertyType: string;
  priceRange: string;
  location: string;
}

const propertyTypes = [
  { id: "all", label: "All Properties" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "fractional", label: "Fractional" },
];

const priceRanges = [
  { id: "all", label: "Any Price" },
  { id: "0-100k", label: "$0 - $100K" },
  { id: "100k-500k", label: "$100K - $500K" },
  { id: "500k-1m", label: "$500K - $1M" },
  { id: "1m+", label: "$1M+" },
];

const locations = [
  { id: "all", label: "All Locations" },
  { id: "new-york", label: "New York" },
  { id: "miami", label: "Miami" },
  { id: "los-angeles", label: "Los Angeles" },
  { id: "dubai", label: "Dubai" },
  { id: "london", label: "London" },
];

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "all",
    priceRange: "all",
    location: "all",
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: "",
      propertyType: "all",
      priceRange: "all",
      location: "all",
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const hasActiveFilters = 
    filters.search !== "" || 
    filters.propertyType !== "all" || 
    filters.priceRange !== "all" || 
    filters.location !== "all";

  return (
    <div className="glass-card p-4 mb-8">
      {/* Main Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search properties, locations, tokens..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-12 h-12 bg-muted/30 border-glass-border/30 focus:border-primary/50"
          />
        </div>
        <Button
          variant={isExpanded ? "default" : "outline"}
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="lg"
            onClick={clearFilters}
            className="gap-2 text-muted-foreground"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-glass-border/20 grid sm:grid-cols-3 gap-4 animate-fade-in">
          {/* Property Type */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Property Type
            </label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateFilter("propertyType", type.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    filters.propertyType === type.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              Price Range
            </label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => updateFilter("priceRange", range.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    filters.priceRange === range.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => updateFilter("location", loc.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    filters.location === loc.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
