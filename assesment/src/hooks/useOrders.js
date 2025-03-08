import { useState } from "react";
import Data from "../data/mockOrders.json";

export const useOrders = () => {
    const [orders, setOrders] = useState(Data); // ✅ orders should be initialized with mock data
    return orders; // ✅ Return only the array, NOT JSX
};
