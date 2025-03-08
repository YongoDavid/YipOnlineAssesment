// Display orders in a table 
import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Spinner } from "@chakra-ui/react";
export default function OrderTable(orders, completeOrder){
    return(
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Order ID</Th>
                    <Th>Customer</Th>
                    <Th>Items</Th>
                    <Th>Total Price</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orders.map(order => (
                    <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.customer}</Td>
                        <Td>{order.items.join(", ")}</Td>
                        <Td>${order.totalPrice.toFixed(2)}</Td>
                        <Td>{order.status}</Td>
                        <Td>
                            {order.status === "Pending" && (
                                <Button colorScheme="green" size="sm" onClick={() => completeOrder(order.id)}>
                                    Complete Order
                                </Button>
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}