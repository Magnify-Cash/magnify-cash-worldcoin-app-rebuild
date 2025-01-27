import { Header } from "@/components/Header";
import { LoanCard } from "@/components/LoanCard";
import { useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="How to Use Magnify Cash" />
      
      <div className="p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Verify Your Identity</h2>
          <p className="text-gray-600 mb-4">
            Use World ID to verify your identity and access loans tailored to your
            verification level:
          </p>

          <LoanCard
            title="WORLD ID"
            amount="$1"
            interest="2%"
            duration="30 days"
            icon="world"
          />
          <LoanCard
            title="PASSPORT"
            amount="$5"
            interest="2%"
            duration="60 days"
            icon="passport"
          />
          <LoanCard
            title="ORB"
            amount="$10"
            interest="1%"
            duration="90 days"
            icon="orb"
          />

          <div className="tip-card">
            💡 Tip: Verifying with ORB unlocks the highest loan limits and exclusive
            perks!
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Apply for a Loan</h2>
          <p className="text-gray-600 mb-4">
            Choose your loan amount and duration based on your verification level
          </p>
          <div className="tip-card">
            💡 Tip: Start small with a $1 loan if you're new to Magnify Cash, and
            increase your limits as you verify further.
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Track & Repay</h2>
          <p className="text-gray-600 mb-4">
            Easily monitor your active loans and make repayments directly through
            your wallet:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>View your loan details, repayment schedule, and status.</li>
          </ul>
          <div className="tip-card">
            💡 Tip: Repaying early helps build trust and unlocks access to larger
            loans over time!
          </div>
        </section>

        <button 
          onClick={() => navigate("/wallet")} 
          className="glass-button w-full"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

export default Guide;