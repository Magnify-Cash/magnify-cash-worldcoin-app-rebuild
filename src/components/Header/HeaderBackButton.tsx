import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderBackButtonProps {
  showBack?: boolean;
}

export const HeaderBackButton = ({ showBack = true }: HeaderBackButtonProps) => {
  const navigate = useNavigate();

  if (!showBack) return <div className="w-9" />;

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
};