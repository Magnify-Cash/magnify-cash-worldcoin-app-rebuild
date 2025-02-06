import { readContract } from "@wagmi/core";
import { magnifyworldabi } from "@/utils/magnifyworldabi";
import { MAGNIFY_WORLD_ADDRESS } from "@/utils/constants";
import { config } from "@/providers/Wagmi";
import { useEffect, useState, useCallback } from "react";

export const VERIFICATION_TIERS = {
  ORB: {
    level: "Orb Scan",
    description: "World ID ORB Verified",
    color: "text-brand-success",
    message: "You're fully verified and eligible for maximum loan amounts!",
    maxLoanAmount: 10,
  },
  PASSPORT: {
    level: "Passport",
    description: "World ID Passport Verified",
    color: "text-brand-warning",
    message: "Get ORB verified to unlock $10 loans!",
    maxLoanAmount: 5,
  },
  NONE: {
    level: "World ID",
    description: "Device-Verified with World ID",
    color: "text-brand-info",
    message:
      "Get World ID verified to unlock higher loan amounts! Verify with Passport for $5 loans or get ORB verified for $10 loans.",
    maxLoanAmount: 1,
  },
};

export type VerificationLevel = keyof typeof VERIFICATION_TIERS;
export interface VerificationTier {
  level: string;
  maxLoanAmount: number;
  description: string;
  color: string;
  message: string;
}

export interface Tier {
  loanAmount: bigint;
  interestRate: bigint;
  loanPeriod: bigint;
  tierId: bigint;
  verificationStatus: VerificationTier;
}

export interface Loan {
  amount: bigint;
  startTime: bigint;
  isActive: boolean;
  interestRate: bigint;
  loanPeriod: bigint;
}

export interface LoanInfo {
  amountBorrowed: bigint;
  dueDate: bigint;
  totalDue: bigint;
}

export interface ContractData {
  loanToken: string | null;
  tierCount: number | null;
  nftInfo: {
    tokenId: bigint | null;
    tier: Tier | null;
  };
  loan: Loan | null;
  allTiers: Record<number, Tier> | null;
}

let globalCache: Record<string, ContractData> = {};

export function invalidateCache(walletAddress: `0x${string}`) {
  delete globalCache[walletAddress];
}

export function useMagnifyWorld(walletAddress: `0x${string}`) {
  const [data, setData] = useState<ContractData | null>(globalCache[walletAddress] || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const loanToken = await readContract(config, {
        address: MAGNIFY_WORLD_ADDRESS,
        abi: magnifyworldabi,
        functionName: "loanToken",
      });

      const tierCount = await readContract(config, {
        address: MAGNIFY_WORLD_ADDRESS,
        abi: magnifyworldabi,
        functionName: "tierCount",
      });

      const userNFT = await readContract(config, {
        address: MAGNIFY_WORLD_ADDRESS,
        abi: magnifyworldabi,
        functionName: "userNFT",
        args: [walletAddress],
      });

      let tokenId: bigint | null = null;
      let nftTier: Tier | null = null;

      if (userNFT && BigInt(userNFT) !== BigInt(0)) {
        tokenId = BigInt(userNFT);
        const tierId = await readContract(config, {
          address: MAGNIFY_WORLD_ADDRESS,
          abi: magnifyworldabi,
          functionName: "nftToTier",
          args: [tokenId],
        });

        if (tierId) {
          const tierData = await readContract(config, {
            address: MAGNIFY_WORLD_ADDRESS,
            abi: magnifyworldabi,
            functionName: "tiers",
            args: [BigInt(tierId)],
          });

          if (tierData) {
            nftTier = {
              loanAmount: BigInt(tierData[0] || 0),
              interestRate: BigInt(tierData[1] || 0),
              loanPeriod: BigInt(tierData[2] || 0),
              tierId: BigInt(tierId),
              verificationStatus: getVerificationStatus(Number(tierId)),
            };
          }
        }
      }

      const loan = await readContract(config, {
        address: MAGNIFY_WORLD_ADDRESS,
        abi: magnifyworldabi,
        functionName: "fetchLoanByAddress",
        args: [walletAddress],
      }) as Loan;

      const allTiers = await fetchAllTiers(Number(tierCount));

      const newData: ContractData = {
        loanToken: String(loanToken),
        tierCount: Number(tierCount),
        nftInfo: {
          tokenId,
          tier: nftTier,
        },
        loan,
        allTiers,
      };

      globalCache[walletAddress] = newData;
      setData(newData);
    } catch (error) {
      console.error("Error fetching contract data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (!globalCache[walletAddress]) {
      fetchData();
    } else {
      setData(globalCache[walletAddress]);
    }
  }, [walletAddress, fetchData]);

  const refetch = useCallback(() => {
    invalidateCache(walletAddress);
    fetchData();
  }, [walletAddress, fetchData]);

  return { data, isLoading, isError, refetch };
}

async function fetchAllTiers(tierCount: number): Promise<Record<number, Tier> | null> {
  const allTiers: Record<number, Tier> = {};
  for (let i = 1; i <= tierCount; i++) {
    try {
      const tierData = await readContract(config, {
        address: MAGNIFY_WORLD_ADDRESS,
        abi: magnifyworldabi,
        functionName: "tiers",
        args: [BigInt(i)],
      });
      
      if (tierData) {
        allTiers[i] = {
          loanAmount: BigInt(tierData[0] || 0),
          interestRate: BigInt(tierData[1] || 0),
          loanPeriod: BigInt(tierData[2] || 0),
          tierId: BigInt(i),
          verificationStatus: getVerificationStatus(i),
        };
      }
    } catch (error) {
      console.error(`Error fetching tier ${i}:`, error);
    }
  }
  return Object.keys(allTiers).length > 0 ? allTiers : null;
}

function getVerificationStatus(tierId: number): VerificationTier {
  let verificationLevel: VerificationLevel;
  switch (Number(tierId)) {
    case 1:
      verificationLevel = "NONE";
      break;
    case 2:
      verificationLevel = "PASSPORT";
      break;
    case 3:
      verificationLevel = "ORB";
      break;
    default:
      verificationLevel = "NONE";
  }

  return VERIFICATION_TIERS[verificationLevel];
}