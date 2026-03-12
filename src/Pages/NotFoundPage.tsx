import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const NotFoundPage= () => {
    const navigate=useNavigate();
  return (
    <div className="bg-mine-shaft-950 flex items-center justify-center min-h-screen">
      <div className="text-center p-8 bg-mine-shaft-900 rounded-lg shadow-md max-w-md">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-bright-sun-400 mb-4">Page Not Found</h2>
        <p className="text-bright-sun-400 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button onClick={()=>navigate('/')}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
