import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { toast } from "sonner";
import { useCallback, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Coins } from "lucide-react";
import { calculateRemainingTime } from "@/utils/timeinfo";
import { CheckCircle2, Loader2 } from "lucide-react";
import { formatUnits } from "viem";
import useRepayLoan from "@/hooks/useRepayLoan";

interface LoanType {
  amount: bigint;
  startTime: bigint;
  isActive: boolean;
  interestRate: bigint;
  loanPeriod: bigint;
}

const RepayLoanCard = ({ loan, data, refetch }: { loan: LoanType; data: any; refetch: any }) => {
  // hooks & state
  const { repayLoanWithPermit2, error, transactionId, isConfirming, isConfirmed } = useRepayLoan();
  const [daysRemaining, hoursRemaining, minutesRemaining] = calculateRemainingTime(
    loan.startTime,
    loan.loanPeriod,
  );
  const currentTime = BigInt(Math.floor(Date.now() / 1000)); // Current time in seconds
  const elapsedTime = currentTime - loan.startTime;
  const totalTime = loan.loanPeriod;
  const progressPercentage = Number(
    Math.max(0, Math.min(100, (Number(elapsedTime) / Number(totalTime)) * 100)),
  );
  console.log(loan.amount, loan.interestRate);
  const loanAmountDue = loan.amount + (loan.amount * loan.interestRate) / 10000n;
  console.log(loanAmountDue);

  // Handle loan repayment
  const handleApplyLoan = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (data?.nftInfo?.tokenId) {
        await repayLoanWithPermit2(loanAmountDue.toString());
      } else {
        toast.error("Unable to pay back loan.");
      }
    },
    [data, repayLoanWithPermit2],
  );

  // Call refetch after loan repayment is confirmed
  useEffect(() => {
    if (isConfirmed) {
      const timeout = setTimeout(() => {
        refetch();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isConfirmed, refetch]);

  return (
    <Card className="p-6 glass-card space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">Active Loan</h3>
          <div className="space-y-2">
            {/* Loan amount formatting */}
            <p className="text-sm text-brand-text-secondary">Loan Amount: ${formatUnits(loan.amount, 6)}</p>
            <p className="text-sm text-brand-text-secondary">
              Interest Rate: {(loan.interestRate / BigInt(100)).toString()}%
            </p>
            <p className="text-sm text-brand-text-secondary">
              Due In: {daysRemaining} days, {hoursRemaining} hours, {minutesRemaining} minutes
            </p>
            <p className="text-lg font-semibold text-brand-text-primary">
              Total Amount Due: ${formatUnits(loanAmountDue, 6)}
            </p>
          </div>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={progressPercentage}
            text={`${progressPercentage.toFixed(0)}%`}
            styles={{
              path: {
                stroke: `rgba(34, 197, 94, ${progressPercentage / 100})`,
                strokeLinecap: "round",
              },
              trail: {
                stroke: "#d6d6d6",
                strokeLinecap: "round",
              },
              text: {
                fill: "#374151",
                fontSize: "24px",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
      {/* Change the button based on NFT verification status */}
      <Button
        onClick={handleApplyLoan}
        className="w-full primary-button"
        disabled={isConfirming || isConfirmed}
      >
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
          <>
            <Coins className="mr-2 h-4 w-4" />
            Repay Loan
          </>
        )}
      </Button>
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
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default RepayLoanCard;
