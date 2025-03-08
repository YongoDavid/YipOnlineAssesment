import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CompleteOrderButton from "./CompleteOrderButton"; // ✅ Import missing component

const MotionTr = motion(Tr);

export default function OrdersTable({ orders = [] }) {  // ✅ Default to an empty array
  return (
    <Table variant="striped" size="lg">
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
        {orders.length > 0 ? (
          orders.map((order) => (
            <MotionTr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.items.join(", ")}</Td>
              <Td>${order.totalPrice.toFixed(2)}</Td>
              <Td>{order.status}</Td>
              <Td>{new Date(order.timestamp).toLocaleString()}</Td>
              <Td>
                {order.status === "Pending" && <CompleteOrderButton orderId={order.id} />}
              </Td>
            </MotionTr>
          ))
        ) : (
          <Tr>
            <Td colSpan="7" style={{ textAlign: "center" }}>No orders available</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
}
