import { AlertCircle, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}
export default function ApiError({
  title = "Error",
  message = "An error occurred while fetching data.",
  onRetry,
}: ErrorDisplayProps = {}) {
  const handleRetry = async () => {
    onRetry && onRetry();
  };
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto mt-20">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <div>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={handleRetry}
        >
          <RotateCcw /> Retry
        </Button>
      </div>
    </Alert>
  );
}
