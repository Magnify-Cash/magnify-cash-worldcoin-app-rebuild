import { Shield } from "lucide-react";

export const LoanCard = ({
  title,
  amount,
  interest,
  duration,
  icon = "device",
}: {
  title: string;
  amount: string;
  interest: string;
  duration: string;
  icon?: "device" | "passport" | "orb";
}) => {
  const getIconColor = () => {
    switch (icon) {
      case "passport":
        return "text-yellow-500";
      case "orb":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="glass-card p-6 mb-4">
      <div className="flex items-center mb-4">
        <Shield className={`w-6 h-6 mr-2 ${getIconColor()}`} />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">Loan Amount: {amount}</p>
        <p className="text-gray-600">Interest Rate: {interest}</p>
        <p className="text-gray-600">Duration: {duration}</p>
      </div>
    </div>
  );
};