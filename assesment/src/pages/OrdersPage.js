import React from "react";
import OrdersTable from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders"; // ✅ Import useOrders

const OrdersPage = () => {
  const orders = useOrders(); // ✅ Fetch orders correctly

  return (
      <div>
        <OrdersTable orders={orders} /> {/* ✅ Pass orders correctly */}
      </div>
  );
};

export default OrdersPage;
