import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Wallet from "./pages/Wallet";
import Loan from "./pages/Loan";
import Dashboard from "./pages/Dashboard";
import Guide from "./pages/Guide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;