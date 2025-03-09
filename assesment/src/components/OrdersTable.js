import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading } from "@chakra-ui/react";
import CompleteOrderButton from "./CompleteOrderButton";
import Data from '../data/mockOrders.json';
import { useState, useEffect } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  if (!CompleteOrderButton) {
    console.error('CompleteOrderButton component not found');
  }

  useEffect(() => {
    try {
      if (!Array.isArray(Data)) {
        throw new Error('Invalid data format');
      }
      setOrders(Data);
      console.log("Loaded orders:", Data); // Debug log
    } catch (err) {
      setError('Error loading orders data');
      console.error('Error loading orders:', err);
    }
  }, []);

  if (error) {
    return <Box p={4}>Error: {error}</Box>;
  }

  return (
    <Box>
      <Heading as="h1" mb={4}>Orders Dashboard</Heading>
      <Table variant="simple" colorScheme="teal" size="lg">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Total Price</Th>
            <Th>Status</Th>
            <Th>Timestamp</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.customer}</Td>
                <Td>{order.items.join(", ")}</Td>
                <Td>${order.totalPrice.toFixed(2)}</Td>
                <Td>{order.status}</Td>
                <Td>{new Date(order.timestamp).toLocaleString()}</Td>
                <Td>
                  {order.status === "Pending" && CompleteOrderButton && (
                    <CompleteOrderButton orderId={order.id} />
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="7" textAlign="center">No orders available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
