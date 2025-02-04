import { User, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface UserInfoProps {
  username: string;
  verificationLevel: string;
}

export const UserInfo = ({ username, verificationLevel }: UserInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{username}</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>{verificationLevel}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};