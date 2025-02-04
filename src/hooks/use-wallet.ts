import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { WalletBalance, Transaction } from "@/types/wallet";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const logAuditEvent = async (event: string, details: any) => {
  console.log(`[Audit] ${event}:`, details);
};

export function useWallet() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: balances = [],
    isLoading: isLoadingBalances,
    error: balancesError,
  } = useQuery({
    queryKey: ["wallet-balances"],
    queryFn: async () => {
      console.log("Fetching wallet balances...");
      await logAuditEvent("FETCH_BALANCES", { timestamp: new Date().toISOString() });
      
      // For demo purposes, return mock data that adds up to $30.41
      const mockBalances = [
        {
          id: 1,
          currency: "Worldcoin",
          symbol: "WLD",
          balance: "$12.55",
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          currency: "USD Coin",
          symbol: "USDC.e",
          balance: "$10.21",
          updated_at: new Date().toISOString(),
        },
        {
          id: 3,
          currency: "Wrapped Bitcoin",
          symbol: "WBTC",
          balance: "$4.32",
          updated_at: new Date().toISOString(),
        },
        {
          id: 4,
          currency: "Wrapped Ethereum",
          symbol: "WETH",
          balance: "$3.33",
          updated_at: new Date().toISOString(),
        }
      ];

      return mockBalances as WalletBalance[];
    },
  });

  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    error: transactionsError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      console.log("Fetching transactions...");
      await logAuditEvent("FETCH_TRANSACTIONS", { timestamp: new Date().toISOString() });
      return [] as Transaction[];
    },
  });

  // Set up real-time subscription for balance updates
  useEffect(() => {
    console.log("Setting up wallet balance subscription...");
    const channel = supabase
      .channel("wallet_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wallet_balances",
        },
        async (payload) => {
          console.log("Wallet balance changed:", payload);
          await logAuditEvent("WALLET_BALANCE_CHANGED", { 
            type: payload.eventType,
            record: payload.new,
            timestamp: new Date().toISOString()
          });
          
          queryClient.invalidateQueries({ queryKey: ["wallet-balances"] });
          toast({
            title: "Balance Updated",
            description: "Your wallet balance has been updated.",
          });
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up wallet balance subscription...");
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  return {
    balances,
    transactions,
    isLoading: isLoadingBalances || isLoadingTransactions,
    error: balancesError || transactionsError,
  };
}