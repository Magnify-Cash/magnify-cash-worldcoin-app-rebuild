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
    <div className="glass-card w-64 aspect-square p-6 mb-4 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
      <div>
        <div className="flex items-center mb-4">
          <Shield className={`w-8 h-8 mr-2 ${getIconColor()}`} />
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-primary mb-2">{amount}</p>
        </div>
      </div>
      <div className="space-y-2 mt-auto">
        <p className="text-gray-600 dark:text-gray-400">{interest}</p>
        <p className="text-gray-600 dark:text-gray-400">{duration}</p>
      </div>
    </div>
  );
};