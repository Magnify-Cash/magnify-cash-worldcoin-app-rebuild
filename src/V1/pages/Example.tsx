import React from "react";
import { useMagnifyWorld } from "@/hooks/useMagnifyWorld";

const ExamplePage = () => {
  const { data, isLoading, isError } = useMagnifyWorld("0x7745B9B74a0C7637fa5B74d5Fc106118bdBB0eE7");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>NFT Dashboard</h1>
      <p>Loan Token Address: {data?.loanToken}</p>
      <p>Number of Tiers: {data?.tierCount}</p>

      <h3>User has NFT?</h3>
      <p>{data?.nftInfo.userNFT ? "Yes" : "No"}</p>

      <h3>User's Active Loans</h3>
      <ul>
        {data?.loans?.map((loan, index) => (
          <li key={index}>
            Loan for NFT ID {loan.amount.toString()}: Amount: {loan.amount.toString()}, Start Time:
            {new Date(Number(loan.startTime) * 1000).toLocaleString()}, Is Active:{" "}
            {loan.isActive ? "Yes" : "No"}
          </li>
        ))}
      </ul>

      <h3>All Tiers</h3>
      <ul>
        {Object.entries(data?.allTiers || {}).map(([tierId, tier]) => (
          <li key={tierId}>
            Tier {tierId}: Loan Amount: {tier.loanAmount.toString()}, Interest Rate:{" "}
            {tier.interestRate.toString()}, Loan Period: {tier.loanPeriod.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamplePage;
