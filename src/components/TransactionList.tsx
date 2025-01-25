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
          <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8 text-gray-500">
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
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100"
        >
          <div className="flex items-center gap-3">
            {transaction.type === 'deposit' && (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-green-600" />
              </div>
            )}
            {transaction.type === 'withdrawal' && (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-red-600" />
              </div>
            )}
            {transaction.type === 'transfer' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-blue-600" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 capitalize">{transaction.type}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className={`font-medium ${
            transaction.type === 'deposit' ? 'text-green-600' : 
            transaction.type === 'withdrawal' ? 'text-red-600' : 
            'text-blue-600'
          }`}>
            {transaction.type === 'deposit' ? '+' : '-'} {transaction.amount} {transaction.currency}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};