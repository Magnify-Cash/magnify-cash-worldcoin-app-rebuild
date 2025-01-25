import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { WalletBalance, Transaction } from "@/types/wallet";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

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
      const { data, error } = await supabase
        .from("wallet_balances")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching wallet balances:", error);
        throw error;
      }
      
      console.log("Wallet balances fetched:", data);
      return data as WalletBalance[];
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
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      console.log("Transactions fetched:", data);
      return data as Transaction[];
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
        (payload) => {
          console.log("Wallet balance changed:", payload);
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