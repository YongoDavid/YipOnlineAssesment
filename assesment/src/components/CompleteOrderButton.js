import { Button } from "@chakra-ui/react";

export default function CompleteOrderButton({ orderId }) {
  const handleComplete = () => {
    console.log(`Completing order ${orderId}`);
    // Add your completion logic here
  };

  return (
    <Button 
      colorScheme="green" 
      size="sm" 
      onClick={handleComplete}
    >
      Complete
    </Button>
  );
}
