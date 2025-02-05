import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { config } from "@/providers/Wagmi";
import { abi } from "@/utils/abi";
import { MAGNIFY_PROTOCOL_ADDRESS } from "@/utils/constants";

export type Loan = {
  id: string;
  amount: number;
  amountPaidBack: number;
  duration: number;
  startTime: number;
  nftCollection: {
    id: string;
  };
  lendingDesk: {
    erc20: {
      id: string;
      symbol: string;
      decimals: string;
    };
  };
  nftId: string;
  interest: string;
  status: string;
  lender: {
    id: string;
  };
  paymountAmountDue: unknown;
};

type BorrowerDashboardResponse = {
  loans: Loan[];
};

const endpoint =
  "https://subgraph.satsuma-prod.com/4f27a5258a15/nftylabs--411108/magnify-cash-worldchain/api";

const BorrowerDashboardQuery = gql`
  query BorrowerDashboard($walletAddress: String!) {
    loans(
      where: { borrower: $walletAddress }
      orderBy: "startTime"
      orderDirection: "desc"
      after: $after
      limit: 100
    ) {
      id
      amount
      amountPaidBack
      duration
      startTime
      nftCollection {
        id
      }
      lendingDesk {
        erc20 {
          id
          symbol
          decimals
        }
      }
      nftId
      interest
      status
      lender {
        id
      }
    }
  }
`;

// Mock data for testing
const mockLoan = {
  id: "1",
  amount: 1000000000,
  amountPaidBack: 1000010273,
  duration: 24,
  startTime: 1728754349,
  nftCollection: {
    id: "0x03c4738ee98ae44591e1a4a4f3cab6641d95dd9a",
  },
  lendingDesk: {
    erc20: {
      id: "0x47b464edb8dc9bc67b5cd4c9310bb87b773845bd",
      symbol: "NORMIE",
      decimals: "9",
    },
  },
  nftId: "95653987387216960243241356308258588196024915877825431379161602519009139400941",
  interest: "100",
  status: "Resolved",
  lender: {
    id: "0x6856355aa4321b88eaaecad2db05ff9c92e69731",
  },
  paymountAmountDue: "100",
};

const mockLoans: Loan[] = Array.from({ length: 5 }, (_, index) => ({
  ...mockLoan,
  // Optionally, if you want each loan to have a unique ID:
  id: `${mockLoan.id}-${index + 1}`,
}));

// Custom hook for Borrower Dashboard
function useBorrowerDashboard(walletAddress: `0x${string}`, isMock = false) {
  const query = useQuery<BorrowerDashboardResponse, Error>({
    queryKey: ["borrowerDashboard", walletAddress, isMock],
    queryFn: async () => {
      if (isMock) {
        // Return mock data if we're in mock mode
        return { loans: mockLoans };
      } else {
        const variables = { walletAddress };
        const borrowerData: BorrowerDashboardResponse = await request(
          endpoint,
          BorrowerDashboardQuery,
          variables,
        );

        const updatedLoans = await Promise.all(
          borrowerData.loans.map(async (loan) => {
            const paymentAmountDue = await readContract(config, {
              abi,
              address: MAGNIFY_PROTOCOL_ADDRESS,
              functionName: "getLoanAmountDue",
              args: [loan.id],
              account: walletAddress,
            });
            return {
              ...loan,
              paymountAmountDue: paymentAmountDue,
            };
          }),
        );

        return {
          ...borrowerData,
          loans: updatedLoans,
        };
      }
    },
  });
  return query;
}

export default useBorrowerDashboard;
