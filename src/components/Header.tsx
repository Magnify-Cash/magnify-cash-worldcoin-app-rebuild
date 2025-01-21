import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = ({ title, showBack = true }: { title: string; showBack?: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-10" />
      )}
      <h1 className="text-xl font-semibold">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => navigate("/")}>
            Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/wallet")}>
            Wallet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/loan")}>
            Loan
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/guide")}>
            Guide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};