import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Clock } from "lucide-react";

const RepayLoan = () => {
  // Mock data - would be replaced with real data later
  const loans = [
    {
      id: 1,
      amount: 5000,
      dueDate: "2024-04-15",
      status: "active",
      type: "Personal",
      repaymentAmount: 5250,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Repay Loan" />
      
      <div className="container max-w-2xl mx-auto p-6 space-y-6">
        {loans.map((loan) => (
          <div
            key={loan.id}
            className="glass-card p-6 space-y-4 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{loan.type} Loan</h3>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {loan.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="font-semibold">${loan.amount}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-semibold">{loan.dueDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Repayment Amount</p>
                  <p className="font-semibold">${loan.repaymentAmount}</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4">
              Repay Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepayLoan;