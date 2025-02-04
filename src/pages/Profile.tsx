import { Header } from "@/components/Header";
import { Shield, User, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock data for UI implementation
  const mockUser = {
    username: "Demo User",
    verificationLevel: "Orb Verified",
  };

  const mockNFTs = [
    { type: "World ID", status: "Available", amount: 1 },
    { type: "Passport", status: "In Use", amount: 5 },
    { type: "Orb Scan", status: "Available", amount: 10 },
  ];

  const handleNFTClick = () => {
    navigate("/loan");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" />
      
      <main className="container max-w-md mx-auto p-4 space-y-6">
        {/* User Info Section */}
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
                <h2 className="text-xl font-semibold">{mockUser.username}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>{mockUser.verificationLevel}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* NFT Collaterals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">NFT Collaterals</h3>
          <div className="grid gap-4">
            {mockNFTs.map((nft, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={handleNFTClick}
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
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;