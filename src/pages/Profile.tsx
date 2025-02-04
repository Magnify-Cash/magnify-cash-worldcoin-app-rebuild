import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "@/components/Profile/UserInfo";
import { NFTCollateral } from "@/components/Profile/NFTCollateral";

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
        <UserInfo 
          username={mockUser.username} 
          verificationLevel={mockUser.verificationLevel} 
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">NFT Collaterals</h3>
          <div className="grid gap-4">
            {mockNFTs.map((nft, index) => (
              <NFTCollateral
                key={index}
                nft={nft}
                index={index}
                onClick={handleNFTClick}
              />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;