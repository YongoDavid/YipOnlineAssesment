import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading, Spinner, Button } from "@chakra-ui/react";
import OrderStatusButton from "./OrderStatusButton"
import FilterSortControls from "./FilterSortControls";
import Data from '../data/mockOrders.json';


// Constants for lazy loading
const ITEMS_PER_PAGE = 10;

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Memoize the filtered and sorted orders
  const processedOrders = useMemo(() => {
    return orders
      .filter(order => !filter || order.status === filter)
      .sort((a, b) => {
        if (!sort) return 0;
        if (sort === 'date') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        if (sort === 'price') {
          return b.totalPrice - a.totalPrice;
        }
        return 0;
      });
  }, [orders, filter, sort]);

  // Memoize the paginated orders
  const paginatedOrders = useMemo(() => {
    const startIndex = 0;
    const endIndex = page * ITEMS_PER_PAGE;
    return processedOrders.slice(startIndex, endIndex);
  }, [processedOrders, page]);

  // Memoize the handleOrderStatusChange function
  const handleOrderStatusChange = useCallback((orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  }, []);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        if (!Array.isArray(Data)) {
          throw new Error('Invalid data format');
        }
        
        // Simulate API delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const initialData = Data.slice(0, ITEMS_PER_PAGE);
        setOrders(initialData);
        setHasMore(Data.length > ITEMS_PER_PAGE);
      } catch (err) {
        setError('Error loading orders data');
        console.error('Error loading orders:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load more data
  const loadMore = async () => {
    try {
      setLoading(true);
      
      // Simulate API delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const nextData = Data.slice(0, (page + 1) * ITEMS_PER_PAGE);
      setOrders(nextData);
      setHasMore(nextData.length < Data.length);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error loading more orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <Box p={4}>Error: {error}</Box>;
  }

  return (
    <Box>
      <Heading 
      as="h1"
      mb={4}
      textAlign="center"
      >
        Orders Dashboard
      </Heading>
      <FilterSortControls setFilter={setFilter} setSort={setSort}/>
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
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <OrderRow 
                key={order.id} 
                order={order} 
                onStatusChange={handleOrderStatusChange}
              />
            ))
          ) : (
            <Tr>
              <Td colSpan="7" textAlign="center">No orders available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      
      {loading && (
        <Box textAlign="center" mt={4}>
          <Spinner size="lg" />
        </Box>
      )}
      
      {!loading && hasMore && (
        <Box textAlign="center" mt={4}>
          <Button onClick={loadMore} colorScheme="teal">
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

// Memoized OrderRow component
const OrderRow = React.memo(({ order, onStatusChange }) => {
  return (
    <Tr>
      <Td>{order.id}</Td>
      <Td>{order.customer}</Td>
      <Td>{order.items.join(", ")}</Td>
      <Td>${order.totalPrice.toFixed(2)}</Td>
      <Td>{order.status}</Td>
      <Td>{new Date(order.timestamp).toLocaleString()}</Td>
      <Td>
        <OrderStatusButton 
          orderId={order.id}
          status={order.status}
          onOrderStatusChange={onStatusChange}
        />
      </Td>
    </Tr>
  );
});

OrderRow.displayName = 'OrderRow';
