import { Header } from "@/components/Header";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { LoanStatus } from "@/components/Dashboard/LoanStatus";
import { CollateralSection } from "@/components/Dashboard/CollateralSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Dashboard" />
      
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <DashboardHeader />
        <LoanStatus />
        <CollateralSection />
      </div>
    </div>
  );
};

export default Dashboard;