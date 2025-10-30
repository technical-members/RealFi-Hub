import { MapPin, Bed, Bath, Square, TrendingUp, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
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
  onClick?: () => void;
}

const typeColors = {
  residential: "bg-primary/20 text-primary border-primary/30",
  commercial: "bg-secondary/20 text-secondary border-secondary/30",
  fractional: "bg-accent/20 text-accent border-accent/30",
};

export function PropertyCard({
  id,
  image,
  title,
  location,
  price,
  tokenPrice,
  roi,
  beds,
  baths,
  sqft,
  tokenized,
  type,
  onClick,
}: PropertyCardProps) {
  return (
    <div
      className="group glass-card overflow-hidden hover-lift cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="outline" className={cn("capitalize", typeColors[type])}>
            {type}
          </Badge>
          {tokenized && (
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
              <Coins className="w-3 h-3 mr-1" />
              Tokenized
            </Badge>
          )}
        </div>

        {/* ROI Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-glass-border/30">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-semibold text-primary">{roi} ROI</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-glass-border/20">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Square className="w-4 h-4" />
            <span>{sqft} ft²</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Property Value</p>
            <p className="font-display text-xl font-bold">{price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Token Price</p>
            <p className="font-semibold text-primary">{tokenPrice}</p>
          </div>
        </div>

        {/* Action */}
        <Button variant="hero" size="sm" className="w-full mt-4">
          View Details
        </Button>
      </div>
    </div>
  );
}
