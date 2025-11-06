import { useAccount, useBalance, useChainId, useDisconnect } from 'wagmi';
import { useCallback } from 'react';

export function useWalletAuth() {
  const { address, isConnected, isConnecting, connector } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  
  const { data: balance } = useBalance({
    address: address,
  });

  const formatAddress = useCallback((addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }, []);

  const formatBalance = useCallback((bal: typeof balance) => {
    if (!bal) return '0';
    return parseFloat(bal.formatted).toFixed(4);
  }, []);

  return {
    address,
    isConnected,
    isConnecting,
    chainId,
    connector,
    balance,
    disconnect,
    formattedAddress: formatAddress(address),
    formattedBalance: formatBalance(balance),
  };
}
