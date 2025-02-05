import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { useNavigate } from "react-router";
import { useMagnifyWorld } from "@/hooks/useMagnifyWorld";
import { ShieldCheck } from "lucide-react";
import { formatUnits } from "viem";

export const Onboarding = () => {
  const navigate = useNavigate();
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const { data, isLoading, isError, refetch } = useMagnifyWorld(ls_wallet);

  return (
    <div className="container py-4 overflow-y-auto">
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">How to Use Magnify Cash</h2>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">1. Verify Your Identity</h3>
            <p className="text-muted-foreground">
              Use World ID to verify your identity and access loans tailored to your verification level:
            </p>
            {Object.entries(data?.allTiers || {}).map(([tierId, tier]) => (
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
                    <span className="font-medium text-gray-800">${formatUnits(tier.loanAmount, 6)}</span>
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
            ))}
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm font-medium">
                💡 Tip: Verifying with ORB unlocks the highest loan limits and exclusive perks!
              </p>
            </div>
            <hr className="my-4 border-t-[1px] border-gray-300" />
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">2. Apply for a Loan</h3>
            <p className="text-muted-foreground">
              Choose your loan amount and duration based on your verification level
            </p>
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm font-medium">
                💡 Tip: Start small with a $1 loan if you're new to Magnify Cash, and increase your limits as
                you verify further.
              </p>
            </div>
            <hr className="my-4 border-t-[1px] border-gray-300" />
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">3. Track & Repay</h3>
            <p className="text-muted-foreground">
              Easily monitor your active loans and make repayments directly through your wallet:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>View your loan details, repayment schedule, and status.</li>
            </ul>
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm font-medium">
                💡 Tip: Repaying early helps build trust and unlocks access to larger loans over time!
              </p>
            </div>
            <hr className="my-4 border-t-[1px] border-gray-300" />
          </div>
        </div>

        <Button onClick={() => navigate("/wallet")} className="w-full">
          Got it, thanks!
        </Button>
      </Card>
    </div>
  );
};

export default Onboarding;
