import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import type { Transaction } from "@/types/wallet";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export const TransactionList = ({ transactions, isLoading }: TransactionListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions yet
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {transactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 hover-lift"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {transaction.type === 'deposit' && (
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-primary" />
                </div>
              )}
              {transaction.type === 'withdrawal' && (
                <div className="w-10 h-10 rounded-full bg-destructive/10 dark:bg-destructive/20 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-destructive" />
                </div>
              )}
              {transaction.type === 'transfer' && (
                <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-secondary" />
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground capitalize">{transaction.type}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className={`font-bold ${
              transaction.type === 'deposit' ? 'text-primary' : 
              transaction.type === 'withdrawal' ? 'text-destructive' : 
              'text-secondary'
            }`}>
              {transaction.type === 'deposit' ? '+' : '-'} {transaction.amount} {transaction.currency}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};