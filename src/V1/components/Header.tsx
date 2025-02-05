import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/tailwind";
import { Menu } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/ui/badge";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMagnifyWorld } from "@/hooks/useMagnifyWorld";

const Header = () => {
  const location = useLocation();
  const showNavigation = location.pathname !== "/";
  const ls_wallet = localStorage.getItem("ls_wallet_address");
  const { data, isLoading, isError } = useMagnifyWorld(ls_wallet);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto text-lg font-semibold">Magnify Cash</div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge
              variant="secondary"
              className={`flex items-center gap-1 ${data?.nftInfo?.tier?.verificationStatus?.color}`}
            >
              <ShieldCheck className="w-3 h-3" />
              {data?.nftInfo?.tier?.verificationStatus?.level}
            </Badge>
          </div>
        </div>
        {showNavigation && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-4 py-2">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              style={{ zIndex: 9999 }}
              className="bg-white shadow-lg border rounded-md"
              align="end"
            >
              <DropdownMenuItem asChild>
                <Link
                  to="/wallet"
                  className={cn("w-full", location.pathname === "/wallet" && "text-primary")}
                >
                  Wallet
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/loan" className={cn("w-full", location.pathname === "/loan" && "text-primary")}>
                  Get a Loan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  className={cn("w-full", location.pathname === "/dashboard" && "text-primary")}
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/onboarding"
                  className={cn("w-full", location.pathname === "/dashboard" && "text-primary")}
                >
                  Get Help
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
