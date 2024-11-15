import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useRouteError, ErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.log(error);
  if (error.status == 404)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
        <div className="space-y-4 sm:space-y-6">
          <AlertCircle className="w-16 h-16 sm:w-24 sm:h-24 text-red-500 mx-auto animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            asChild
            className="inline-flex items-center px-4 py-2 rounded-md transition-colors duration-300"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </div>
    );
}
