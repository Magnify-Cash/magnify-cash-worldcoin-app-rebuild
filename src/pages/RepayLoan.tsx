import { useCallback, useMemo } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, Clock } from "lucide-react";
import { Loan, useMagnifyWorld } from "@/hooks/useMagnifyWorld";
import { calculateRemainingTime } from "@/utils/timeinfo";
import useRepayLoan from "@/hooks/useRepayLoan";
import { useToast } from "@/hooks/use-toast";

const RepayLoan = () => {
  // hooks
  const toast = useToast();
  const navigate = useNavigate();
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const { data, isLoading, isError, refetch } = useMagnifyWorld(ls_wallet);
  const loan = data?.loan;
  const loanData: Loan = loan && loan[1];
  /*
  const loanData = {
    amount: 100000n, // 100,000 units of currency (e.g., dollars, assuming smallest unit is 1)
    interestRate: 500n, // 5% annual interest rate (500 basis points)
    isActive: true,
    loanPeriod: 31536000n, // 1 year in seconds (365 days * 24 hours * 60 minutes * 60 seconds)
    startTime: 1672531200n, // Example start time in UNIX timestamp (e.g., January 1, 2023, 00:00:00 UTC)
  };
  */

  // loan repayment
  // TODO: DONT RUN THIS LOAN REPAYMENT BLOCK UNTIL isLoading IS FALSE
  // Use useMemo to memoize calculation only when loanData changes
  const loanAmountDue = useMemo(() => {
    if (loanData) {
      return loanData.amount + (loanData.amount * loanData.interestRate) / 10000n;
    }
    return 0n; // Default value if loanData is not available
  }, [loanData]);

  const { repayLoanWithPermit2, error, transactionId, isConfirming, isConfirmed } = useRepayLoan();
  const handleApplyLoan = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (data?.nftInfo?.tokenId) {
        await repayLoanWithPermit2(loanAmountDue.toString());
      } else {
        toast.error("Unable to pay back loan.");
      }
    },
    [data, repayLoanWithPermit2, loanAmountDue],
  );

  // Loading & error states
  if (isLoading || !loan) return <div className="container mx-auto p-6 text-center">Loading...</div>;
  if (isError) return <div className="container mx-auto p-6 text-center">Error fetching data.</div>;

  // No loan found
  if (loan[0] === true) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Loan Status" />
        <div className="container max-w-2xl mx-auto p-6 space-y-6">
          <div className="glass-card p-6 space-y-4 hover:shadow-lg transition-all duration-200">
            <h3 className="text-lg font-semibold text-center">No Active Loans</h3>
            <p className="text-center text-muted-foreground">
              It looks like you don't have any active loans. Would you like to request one?
            </p>
            <Button onClick={() => navigate("/loan")} className="w-full mt-4">
              Request a Loan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // active loan
  if (loan[0] === false) {
    const dueDateBigInt = BigInt(loanData.startTime) + BigInt(loanData.loanPeriod);
    const dueDateMs = Number(dueDateBigInt) * 1000; // Convert seconds to milliseconds and to Number type
    const [daysRemaining, hoursRemaining, minutesRemaining, dueDate] = calculateRemainingTime(
      loanData.startTime,
      loanData.loanPeriod,
    );
    return (
      <div className="min-h-screen bg-background">
        <Header title="Repay Loan" />
        <div className="container max-w-2xl mx-auto p-6 space-y-6">
          <div className="glass-card p-6 space-y-4 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              {/*
              TODO: NO LOAN TYPE
              <h3 className="text-lg font-semibold">{loan.type} Loan</h3>
              */}
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {minutesRemaining === 0 ? "defaulted" : "active"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="font-semibold">${loanData.amount?.toString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-semibold">{dueDate.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Remaining</p>
                  <p className="font-semibold">
                    Due In: {daysRemaining} days, {hoursRemaining} hours, {minutesRemaining} minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Repayment Amount</p>
                  <p className="font-semibold">${loanData.amount?.toString()}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleApplyLoan}
              className="w-full primary-button"
              disabled={isConfirming || isConfirmed}
            >
              {isConfirming ? <>Confirming...</> : isConfirmed ? <>Confirmed</> : <>Repay Loan</>}
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
          </div>
        </div>
      </div>
    );
  }
};

export default RepayLoan;
