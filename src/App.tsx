import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Welcome from "@/pages/Welcome";
import Guide from "@/pages/Guide";
import Dashboard from "@/pages/Dashboard";
import Wallet from "@/pages/Wallet";
import Loan from "@/pages/Loan";
import Profile from "@/pages/Profile";
import UpgradeVerification from "@/pages/UpgradeVerification";
import Announcements from "@/pages/Announcements";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/announcements" replace />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upgrade-verification" element={<UpgradeVerification />} />
      </Routes>
    </Router>
  );
}

export default App;