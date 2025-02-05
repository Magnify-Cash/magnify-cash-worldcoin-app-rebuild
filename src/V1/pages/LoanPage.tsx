import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { formatUnits } from "viem";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useMagnifyWorld } from "@/hooks/useMagnifyWorld";
import { toast } from "sonner";
import useRequestLoan from "@/hooks/useRequestLoan";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/ui/badge";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";

const LoanPage = () => {
  // Hooks
  const navigate = useNavigate();
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const { data, isLoading, isError, refetch } = useMagnifyWorld(ls_wallet);
  const { requestNewLoan, error, transactionId, isConfirming, isConfirmed } = useRequestLoan();

  // state
  const nftInfo = data?.nftInfo || { tokenId: null, tier: null };
  const [activeClaim, setActiveClaim] = useState("device");
  const showAllTiers = !nftInfo.tokenId; // If there's no NFT, show all tiers
  const hasActiveLoan = data?.loans?.some((loan) => loan.isActive);

  // Handle loan application
  const handleApplyLoan = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (data?.nftInfo?.tokenId) {
        await requestNewLoan();
      } else {
        alert("Unable to apply for loan. Ensure you have a verified NFT.");
      }
    },
    [data, requestNewLoan],
  );

  // Handle claiming verified NFT with device
  const handleClaimDeviceVerifiedNFT = async (proof: ISuccessResult) => {
    try {
      const res = await fetch("https://worldid-backend.kevin8396.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof,
          signal: ls_wallet, // User's wallet address from MiniKit
          action: "mint-device-verified-nft",
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Verification failed");
      }

      const data = await res.json();
      console.log("NFT minted successfully:", data);
      toast.success("NFT minted successfully. Reloading...");
      setTimeout(() => {
        window.location.reload();
      }, 5000);

      // You might want to show a success message or transaction hash to the user
      return data;
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification error");
      throw error;
    }
  };

  // Handle claiming verified NFT with orb
  const handleClaimOrbVerifiedNFT = async (proof: ISuccessResult) => {
    try {
      const res = await fetch("https://worldid-backend.kevin8396.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof,
          signal: ls_wallet, // User's wallet address from MiniKit
          action: "mint-orb-verified-nft",
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Verification failed");
      }

      const data = await res.json();
      console.log("NFT minted successfully:", data);

      // You might want to show a success message or transaction hash to the user
      return data;
    } catch (error) {
      console.error("Verification error:", error);
      throw error;
    }
  };

  // Handle post-claim of verified NFT
  const handleSuccessfulClaim = () => {
    refetch();
    setTimeout(() => navigate("/loan"), 1000);
  };

  // Handle navigation after claiming loan
  const handleNavigateAfterTransaction = () => {
    refetch();
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  if (isLoading) return <div className="container mx-auto p-6 text-center">Loading...</div>;
  if (isError) return <div className="container mx-auto p-6 text-center">Error fetching data.</div>;
  return (
    <div className="container p-6 space-y-6 animate-fade-up">
      <h1 className="text-2xl font-bold text-center mb-6">Get a Loan</h1>

      {hasActiveLoan ? (
        <Card className="p-6 space-y-6 bg-white/50 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">You already have an active loan</h2>
            <p className="mt-4 text-gray-600">
              You currently have an active loan. Please navigate to your dashboard for more details.
            </p>
            <Button type="button" onClick={() => navigate("/dashboard")} className="mt-4 w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 space-y-6 bg-white/50 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="text-md text-center text-gray-500">
              {nftInfo.tokenId ? (
                <p>{nftInfo.tier?.message}</p>
              ) : (
                <>
                  <p>You don't have an NFT yet.</p>
                  <p>Claim one to start!</p>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleApplyLoan} className="space-y-6 my-0">
            <Card className="p-6 space-y-6 glass-card bg-opacity-50 border rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex flex-col items-center space-y-2">
                <h2 className="text-xl font-semibold text-center tracking-wide text-gray-800">
                  Current Loan Eligibility
                </h2>
                {nftInfo?.tokenId && (
                  <Badge
                    variant="secondary"
                    className={`${nftInfo?.tier?.verificationStatus?.color} flex items-center space-x-2 px-3 py-1 rounded-md`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>{nftInfo?.tier?.verificationStatus?.description}</span>
                  </Badge>
                )}
              </div>

              {/* Loan Terms */}
              <div className="space-y-6">
                {showAllTiers ? (
                  Object.entries(data?.allTiers || {}).map(([tierId, tier]) => (
                    <div
                      key={tierId}
                      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-base font-medium flex items-center space-x-2 ${tier.verificationStatus.color}`}
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>{tier.verificationStatus.level}</span>
                        </h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Loan Amount:{" "}
                          <span className="font-medium text-gray-800">
                            ${formatUnits(tier.loanAmount, 6)}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Interest Rate:{" "}
                          <span className="font-medium text-gray-800">
                            {((tier?.interestRate || BigInt(0)) / BigInt(100)).toString()}%
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Duration:{" "}
                          <span className="font-medium text-gray-800">
                            {((tier.loanPeriod || BigInt(0)) / BigInt(60 * 24 * 60)).toString()} days
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Loan Amount:{" "}
                      <span className={`font-medium ${nftInfo.tier?.color}`}>
                        ${formatUnits(nftInfo.tier?.loanAmount || 0, 6)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Interest Rate:{" "}
                      <span className={`font-medium ${nftInfo.tier?.color}`}>
                        {((nftInfo.tier?.interestRate || BigInt(0)) / BigInt(100)).toString()}%
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration:{" "}
                      <span className={`font-medium ${nftInfo.tier?.color}`}>
                        {((nftInfo.tier?.loanPeriod || BigInt(0)) / BigInt(60 * 24 * 60)).toString()} days
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Change the button based on NFT verification status */}
            {nftInfo.tokenId ? (
              <Button type="submit" disabled={isConfirming || isConfirmed} className="w-full">
                {isConfirming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirming...
                  </>
                ) : isConfirmed ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Confirmed
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            ) : (
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4">
                  <IDKitWidget
                    app_id="app_cfd0a40d70419e3675be53a0aa9b7e10"
                    action={activeClaim === "device" ? "mint-device-verified-nft" : "mint-orb-verified-nft"}
                    signal={ls_wallet}
                    onSuccess={handleSuccessfulClaim}
                    handleVerify={
                      activeClaim === "device" ? handleClaimDeviceVerifiedNFT : handleClaimOrbVerifiedNFT
                    }
                    verification_level={
                      activeClaim === "device" ? VerificationLevel.Device : VerificationLevel.Orb
                    }
                  >
                    {({ open }) => (
                      <>
                        <Button
                          type="button"
                          onClick={() => {
                            setActiveClaim("device");
                            open();
                          }}
                          className="w-full sm:w-auto px-4 py-2 rounded-md bg-brand-turquoise"
                        >
                          Claim Device-Verified NFT
                        </Button>
                        <Button
                          type="button"
                          disabled
                          className="w-full sm:w-auto px-4 py-2 rounded-md bg-opacity-40"
                        >
                          Claim Passport-Verified NFT (coming soon)
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setActiveClaim("orb");
                            open();
                          }}
                          className="w-full sm:w-auto px-4 py-2 rounded-md bg-brand-success"
                        >
                          Claim Orb-Verified NFT
                        </Button>
                      </>
                    )}
                  </IDKitWidget>
                </div>
              </div>
            )}
          </form>

          {error && <p className="text-red-500">{error}</p>}
          {transactionId && (
            <div className="mt-4">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                Transaction ID:{" "}
                <span title={transactionId}>
                  {transactionId.slice(0, 10)}...{transactionId.slice(-10)}
                </span>
              </p>
              {isConfirming && <p>Confirming transaction...</p>}
              {isConfirmed && (
                <>
                  <p>Transaction confirmed!</p>
                  <Button type="button" onClick={handleNavigateAfterTransaction} className="mt-2 w-full">
                    View Loan Details
                  </Button>
                </>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default LoanPage;
