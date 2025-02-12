import { Globe, IdCard, ScanLine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconType = "passport" | "world" | "orb";

export const LoanCard = ({
  title,
  amount,
  interest,
  duration,
  icon = "world",
}: {
  title: string;
  amount: string;
  interest: string;
  duration: string;
  icon?: IconType;
}) => {
  const getIcon = (): { Icon: LucideIcon; color: string } => {
    switch (icon) {
      case "passport":
        return { Icon: IdCard, color: "text-blue-500" };
      case "orb":
        return { Icon: ScanLine, color: "text-green-500" };
      default:
        return { Icon: Globe, color: "text-primary" };
    }
  };

  const { Icon, color } = getIcon();

  return (
    <div className="glass-card w-64 p-6 mb-1 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
      <div>
        <div className="flex items-center mb-4">
          <Icon className={`w-8 h-8 mr-3 ${color}`} />
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      </div>
      <div className="space-y+1 mt-auto">
        <p className="text-gray-600 dark:text-gray-400">Loan Amount: {amount}</p>
        <p className="text-gray-600 dark:text-gray-400">Interest Rate: {interest}</p>
        <p className="text-gray-600 dark:text-gray-400">Duration: {duration}</p>
      </div>
    </div>
  );
};