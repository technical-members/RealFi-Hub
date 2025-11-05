import { useState } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, ArrowRight, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface TransactionButtonProps {
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
  amount?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TransactionButton({
  onSuccess,
  onError,
  amount = "0.01",
  children,
  className,
  disabled,
}: TransactionButtonProps) {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  
  const { sendTransaction, isPending: isWritePending } = useSendTransaction();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleTransaction = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    try {
      sendTransaction({
        to: address, // Demo: sending to self
        value: parseEther(amount),
      }, {
        onSuccess: (hash) => {
          setTxHash(hash);
          toast({
            title: "Transaction submitted",
            description: "Waiting for confirmation...",
          });
          onSuccess?.(hash);
        },
        onError: (error) => {
          toast({
            title: "Transaction failed",
            description: error.message,
            variant: "destructive",
          });
          onError?.(error);
        },
      });
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  const isLoading = isWritePending || isConfirming;

  if (!isConnected) {
    return (
      <Button
        variant="hero"
        onClick={() => openConnectModal?.()}
        className={className}
        disabled={disabled}
      >
        <Wallet className="w-4 h-4" />
        Connect to Purchase
      </Button>
    );
  }

  return (
    <Button
      variant="hero"
      onClick={handleTransaction}
      disabled={isLoading || disabled}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {isConfirming ? 'Confirming...' : 'Signing...'}
        </>
      ) : isConfirmed ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          Confirmed!
        </>
      ) : (
        children || (
          <>
            Sign Transaction
            <ArrowRight className="w-4 h-4" />
          </>
        )
      )}
    </Button>
  );
}
