interface LoanResponse {
  amount: string;
  interest: string;
  duration: string;
}

export const fetchLoanEligibility = async (): Promise<LoanResponse> => {
  console.log("Fetching loan eligibility...");
  // Simulated API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulated response
  return {
    amount: "$1,000",
    interest: "2.5%",
    duration: "30 days"
  };
};