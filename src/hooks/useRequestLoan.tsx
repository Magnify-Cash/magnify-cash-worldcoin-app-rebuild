import { useCallback, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { createPublicClient, http } from "viem";
import { worldchain } from "wagmi/chains";
import { MAGNIFY_WORLD_ADDRESS, WORLDCOIN_CLIENT_ID } from "@/utils/constants";

type LoanDetails = {
  amount: number;
  interest: number;
  totalDue: number;
  transactionId: string;
};

const useRequestLoan = () => {
  const [error, setError] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);

  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const { isLoading: isConfirmingTransaction, isSuccess: isTransactionConfirmed } =
    useWaitForTransactionReceipt({
      client: client,
      transactionId: transactionId || "",
      appConfig: {
        app_id: WORLDCOIN_CLIENT_ID,
      },
    });

  const requestLoan = useCallback(async () => {
    setError(null);
    setTransactionId(null);
    setIsConfirming(false);
    setIsConfirmed(false);
    setLoanDetails(null);

    try {
      const { commandPayload, finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: MAGNIFY_WORLD_ADDRESS,
            abi: [
              {
                inputs: [],
                name: "requestLoan",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
            ],
            functionName: "requestLoan",
            args: [],
          },
        ],
      });

      if (finalPayload.status === "success") {
        setTransactionId(finalPayload.transaction_id);
        console.log("Loan request transaction sent:", finalPayload.transaction_id);

        setLoanDetails({
          amount: 0, // Set based on contract terms
          interest: 0, // Set based on contract terms
          totalDue: 0, // Calculate total with interest
          transactionId: finalPayload.transaction_id,
        });
      } else {
        console.error("Error sending transaction", finalPayload, commandPayload);
        setError(`Transaction failed: ${finalPayload.details.simulationError.split("string: ")[1]}`);
      }
    } catch (err) {
      console.error("Error sending transaction", err);
      setError(`Transaction failed: ${(err as Error).message}`);
    }
  }, []);

  return {
    requestLoan,
    error,
    transactionId,
    isConfirming: isConfirmingTransaction,
    isConfirmed: isTransactionConfirmed,
    loanDetails,
  };
};

export default useRequestLoan;