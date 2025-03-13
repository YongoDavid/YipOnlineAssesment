import { Button } from "@chakra-ui/react";

export default function OrderStatusButton({ orderId, status, onOrderStatusChange }) {
  const handleStatusToggle = () => {
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    onOrderStatusChange(orderId, newStatus);
  };

  return (
    <Button 
      colorScheme={status === "Pending" ? "green" : "orange"}
      size="sm" 
      onClick={handleStatusToggle}
    >
      {status === "Pending" ? "Complete" : "Mark Pending"}
    </Button>
  );
}
