import { Header } from "@/components/Header";
import { LoanCard } from "@/components/LoanCard";
import { useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="Help Center" />
      
      <div className="p-6 text-left">
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-6 underline">How to Use Magnify Cash</h1>

          <h2 className="text-xl font-semibold mb-4">1. Verify Your Identity</h2>
          <p className="text-gray-600 mb-4">
            Use World ID to verify your identity and access loans tailored to your
            verification level:
          </p>

          <LoanCard
            title="DEVICE"
            amount="$1"
            interest="2%"
            duration="30 days"
            icon="world"
          />
          <LoanCard
            title="PASSPORT (Coming Soon)"
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
          <h2 className="text-xl font-semibold mb-4">2. Apply for a Loan</h2>
          <p className="text-gray-600 mb-4">
            Choose your loan amount and duration based on your verification level
          </p>
          <div className="tip-card">
            💡 Tip: Start small with a $1 loan if you're new to Magnify Cash, and
            increase your limits as you verify further.
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Track & Repay</h2>
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

{/* <button 
          onClick={() => navigate("/wallet")} 
          className="glass-button w-full mb-8"
        >
          Got it, thanks!
        </button> */}
        <section className="mb-8 border-t border-gray-300 pt-6">
          <h1 className="text-2xl font-bold mb-6 underline">FAQ</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">1. How many loans can I apply for at a time?</h2>
            <p className="text-gray-600">Currently you can only apply for one loan at a time.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">2. What happens if I don't repay my loan before the due date?</h2>
            <p className="text-gray-600">If you default on your loan, you will lose the ability to repay it. Defaulting also means you will no longer be eligible to apply for new loans. To avoid this, ensure you repay your loans on time! For current defaulters who wish to continue borrowing in the future, stay tuned for further updates.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">3. What currencies are supported for loans on the app?</h2>
            <p className="text-gray-600">We currently only provide loans in USDc.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">4. Can I repay my loan with a currency other than USDc?</h2>
            <p className="text-gray-600">No, loans can only be repaid using USDc. Other currencies are currently not supported for loan repayment.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">5. What is an NFT collateral?</h2>
            <p className="text-gray-600">When you first verify your identity on the app, Magnify Cash mints a unique NFT for you! This NFT comes with several tiers that represent your verification level. It also serves as collateral whenever you apply for a loan. You can check the collateral availability of your NFT on your Profile page.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">6. Where can I get the latest updates on Magnify?</h2>
            <p className="text-gray-600">You can stay updated by joining us on <a className="text-blue-600 underline" href="https://t.me/MagnifyCommunity">Telegram</a> and <a className="text-blue-600 underline" href="https://discord.gg/magnifycash">Discord</a>.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guide;