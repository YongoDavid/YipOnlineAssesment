import { useState, useEffect } from "react";
import { fetchOrders } from "../utils/api";

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const data = await fetchOrders();
            setOrders(data);
            setLoading(false);
        };
        getOrders();
    }, []);

    return { orders, setOrders, loading };
};
