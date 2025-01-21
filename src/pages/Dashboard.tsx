import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="Loan Dashboard" />
      
      <div className="p-6">
        <div className="glass-card p-6 text-center">
          <p className="text-xl mb-6">No active loans.</p>
          
          <button 
            onClick={() => navigate("/loan")}
            className="glass-button w-full"
          >
            Request a new loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;