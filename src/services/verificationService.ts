import { supabase } from "@/integrations/supabase/client";

export type VerificationStatus = {
  hasDeviceVerification: boolean;
  hasPassportVerification: boolean;
  hasOrbVerification: boolean;
};

export const checkVerificationEligibility = async (worldId: string): Promise<VerificationStatus> => {
  console.log("Checking verification eligibility for World ID:", worldId);
  
  // TODO: Replace with actual World ID API integration
  const mockStatus = {
    hasDeviceVerification: true, // All World ID users have this
    hasPassportVerification: false,
    hasOrbVerification: false
  };
  
  return mockStatus;
};

export const upgradeVerification = async (
  worldId: string,
  type: "device" | "passport" | "orb"
): Promise<boolean> => {
  console.log(`Upgrading verification for World ID ${worldId} to ${type}`);
  
  try {
    // TODO: Replace with actual NFT minting logic
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          type: "verification_upgrade",
          currency: "WLD",
          amount: type === "device" ? 1 : type === "passport" ? 5 : 10,
          status: "completed",
          metadata: { verificationType: type }
        }
      ]);

    if (error) throw error;
    
    console.log("Verification upgrade successful:", data);
    return true;
  } catch (error) {
    console.error("Error upgrading verification:", error);
    return false;
  }
};