import { useState} from "react";
import Data from '../data/mockOrders.json';
import OrdersTable from "../components/OrdersTable";

export const useOrders = () => {
    const [orders , setOrders] = useState(Data);
    return (
        <div>
            {orders.map(order => {
                <OrdersTable key={order.id} order={order} />
            })}
        </div>
    )
}; 
