import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SignInModal from "@/components/SignInModal";
import { Sheet, SheetContent } from "@/ui/sheet";
import { FundingOptions } from "@/components/FundingOptions";
import { MascotIllustration } from "@/components/MascotIllustration";

const Index = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showFundingOptions, setShowFundingOptions] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log("User signed in successfully");
    setShowSignInModal(false);
    navigate("/onboarding");
  };

  const getStarted = () => {
    if (localStorage.getItem("ls_wallet_address") === null) {
      setShowSignInModal(true);
    } else {
      console.log("User already signed in");
      setShowSignInModal(false);
      navigate("/wallet");
    }
  };

  const [step, setStep] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep % 3) + 1); // Cycle through 1, 2, 3
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-background to-brand-background-end">
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
        <MascotIllustration step={step} />
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Magnify Cash</h1>
          <p className="text-xl text-gray-600">Your AI-powered lending companion</p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => getStarted()}
            className="w-full px-6 py-3 text-white bg-brand-turquoise font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(45,255,249,0.5)] border-2 border-transparent hover:border-white/20"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Modals */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
      />
      <Sheet open={showFundingOptions} onOpenChange={setShowFundingOptions}>
        <SheetContent>
          <FundingOptions onClose={() => setShowFundingOptions(false)} />
        </SheetContent>
      </Sheet>
      {/* End Modals */}
    </div>
  );
};

export default Index;
