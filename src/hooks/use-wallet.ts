import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { WalletBalance, Transaction } from "@/types/wallet";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const logAuditEvent = async (event: string, details: any) => {
  console.log(`[Audit] ${event}:`, details);
  // In a production environment, you would want to persist these logs
  // to a secure storage system or dedicated audit log table
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
      
      const { data, error } = await supabase
        .from("wallet_balances")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching wallet balances:", error);
        await logAuditEvent("FETCH_BALANCES_ERROR", { error });
        throw error;
      }
      
      console.log("Wallet balances fetched:", data);
      await logAuditEvent("FETCH_BALANCES_SUCCESS", { count: data?.length });
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
      await logAuditEvent("FETCH_TRANSACTIONS", { timestamp: new Date().toISOString() });
      
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching transactions:", error);
        await logAuditEvent("FETCH_TRANSACTIONS_ERROR", { error });
        throw error;
      }

      console.log("Transactions fetched:", data);
      await logAuditEvent("FETCH_TRANSACTIONS_SUCCESS", { count: data?.length });
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