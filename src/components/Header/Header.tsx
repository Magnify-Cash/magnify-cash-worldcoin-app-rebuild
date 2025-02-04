import { HeaderBackButton } from "./HeaderBackButton";
import { HeaderMenu } from "./HeaderMenu";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export const Header = ({ title, showBack = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <HeaderBackButton showBack={showBack} />
          <h1 className="text-lg font-semibold">{title}</h1>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};