import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Building2,
  LayoutDashboard,
  Users,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WalletButton } from "@/components/wallet/WalletButton";

const navLinks = [
  { name: "Marketplace", href: "/marketplace", icon: Building2 },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Investors", href: "/investors", icon: Users },
  { name: "Admin", href: "/admin", icon: Shield },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-glass-border/20">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div
                  className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-300 
flex items-center justify-center shadow-md 
transition-all duration-300 hover:shadow-xl

"
                >
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">RealFi </span>
                <span className="text-foreground">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Connect Wallet Button */}
            <div className="hidden md:flex items-center gap-4">
              <WalletButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-card mx-4 mb-4 p-4 animate-scale-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-glass-border/20">
                <WalletButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
