import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button variant="hero" onClick={openConnectModal}>
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="destructive" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {/* Chain Selector */}
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={openChainModal}
                    className="hidden sm:flex gap-2"
                  >
                    {chain.hasIcon && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden"
                        style={{ background: chain.iconBackground }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden md:inline">{chain.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>

                  {/* Account Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary" />
                        <span className="font-mono text-sm">
                          {account.displayName}
                        </span>
                        {account.displayBalance && (
                          <span className="hidden sm:inline text-muted-foreground">
                            ({account.displayBalance})
                          </span>
                        )}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-card border-glass-border">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium">Connected</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {account.address.slice(0, 6)}...{account.address.slice(-4)}
                        </p>
                      </div>
                      <DropdownMenuSeparator className="bg-glass-border/30" />
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(account.address);
                          toast({
                            title: "Address copied",
                            description: "Wallet address copied to clipboard",
                          });
                        }}
                        className="cursor-pointer"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Address
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => window.open(`https://etherscan.io/address/${account.address}`, '_blank')}
                        className="cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Explorer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-glass-border/30" />
                      <DropdownMenuItem
                        onClick={openAccountModal}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
