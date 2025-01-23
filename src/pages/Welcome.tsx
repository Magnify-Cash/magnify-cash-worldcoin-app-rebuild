import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Magnify Cash</h1>
        <p className="text-xl text-gray-600 mb-8">Get a loan against your world ID</p>
        <button 
          onClick={() => navigate("/wallet")} 
          className="glass-button w-full"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;