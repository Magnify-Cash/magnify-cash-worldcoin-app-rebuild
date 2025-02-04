import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface NFT {
  type: string;
  status: string;
  amount: number;
}

interface NFTCollateralProps {
  nft: NFT;
  index: number;
  onClick: () => void;
}

export const NFTCollateral = ({ nft, index, onClick }: NFTCollateralProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer transition-transform hover:scale-105"
    >
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{nft.type}</h4>
              <p className="text-sm text-muted-foreground">
                ${nft.amount.toLocaleString()}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              nft.status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {nft.status}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};