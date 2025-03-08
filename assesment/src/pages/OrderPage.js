// Fetch orders, manage state, and connect to WebSocket.
import { useState } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useOrders } from "../hooks/useOrders";
import OrderTable from "../components/OrderTable";
import FilterSortControls from "../components/FilterSortControls";

const OrdersPage = () => {
    const { orders, setOrders, loading } = useOrders();
    const [filterStatus, setFilterStatus] = useState("");
    const [sortOption, setSortOption] = useState("");

    const completeOrder = (id) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, status: "Completed" } : order
            )
        );
    };

    let displayedOrders = [...orders];
    if (filterStatus) {
        displayedOrders = displayedOrders.filter(order => order.status === filterStatus);
    }
    if (sortOption === "date") {
        displayedOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortOption === "price") {
        displayedOrders.sort((a, b) => b.totalPrice - a.totalPrice);
    }

    return (
        <Box p={4}>
            <Heading mb={4}>Restaurant Orders</Heading>
            <FilterSortControls filterStatus={filterStatus} setFilterStatus={setFilterStatus} sortOption={sortOption} setSortOption={setSortOption} />
            {loading ? <Spinner /> : <OrderTable orders={displayedOrders} completeOrder={completeOrder} />}
        </Box>
    );
};

export default OrdersPage;
