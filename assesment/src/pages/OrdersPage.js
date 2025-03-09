import React from "react";
import OrdersTable from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders"; // ✅ Import the hook

const OrdersPage = () => {
  const orders = useOrders(); // ✅ Fetch orders

  return (
    <div>
      <OrdersTable orders={orders} /> {/* ✅ Pass orders as props */}
    </div>
  );
};

export default OrdersPage;
