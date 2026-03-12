import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate=useNavigate();
  return (
    <div className="bg-mine-shaft-950 flex items-center justify-center min-h-screen">
      <div className="text-center p-8 bg-mine-shaft-900 rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-bright-sun-400 mb-4">Unauthorized Access</h2>
        <p className="text-bright-sun-400 mb-6">
          Sorry, you don’t have permission to view this page.
        </p>
        <Button onClick={()=>navigate('/')}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
