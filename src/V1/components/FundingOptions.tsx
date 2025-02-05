import { CreditCard, Wallet, SmartphoneNfc } from "lucide-react";
import { toast } from "sonner";

interface FundingOptionsProps {
  onClose: () => void;
}

export const FundingOptions = ({ onClose }: FundingOptionsProps) => {
  const handleSelect = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    toast.info(`${method} selected. This feature is coming soon!`);
    onClose();
  };

  const paymentMethods = [
    {
      name: "PayPal",
      icon: Wallet,
      description: "Variable fees • Instant",
      bgColor: "bg-[#0070BA]",
    },
    {
      name: "Card",
      icon: CreditCard,
      description: "Variable fees • Takes minutes",
      bgColor: "bg-purple-500",
    },
    {
      name: "Apple Pay",
      icon: SmartphoneNfc,
      description: "Variable fees • Takes minutes",
      bgColor: "bg-black",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Pay with</h2>
      <p className="text-gray-600 mb-6">How do you prefer to pay for your Dollars?</p>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.name}
            onClick={() => handleSelect(method.name)}
            className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center`}>
              <method.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{method.name}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};