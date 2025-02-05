import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "@/providers/Wagmi";
import { Toaster } from "@/ui/toaster";
import { Toaster as Sonner } from "@/ui/sonner";
import { TooltipProvider } from "@/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MiniKitProvider } from "./providers/MiniKitProvider";
import Header from "./components/Header";
import Index from "./pages/Index";
import LoanPage from "./pages/LoanPage";
import Onboarding from "./pages/Onboarding";
import LoanDashboardPage from "./pages/LoanDashboardPage";
import WalletPage from "./pages/WalletPage";
import { ErrorBoundary } from "./utils/monitoring";
import Example from "./pages/Example";
import ProtectedRoute from "./pages/ProtectedRoute";

// Initialize QueryClient outside of component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary fallback={<div>An error has occurred</div>}>
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <MiniKitProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route
                        path="/onboarding"
                        element={
                          <ProtectedRoute>
                            <Onboarding />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/loan"
                        element={
                          <ProtectedRoute>
                            <LoanPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <LoanDashboardPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/wallet"
                        element={
                          <ProtectedRoute>
                            <WalletPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/example"
                        element={
                          <ProtectedRoute>
                            <Example />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </MiniKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  </ErrorBoundary>
);

export default App;
