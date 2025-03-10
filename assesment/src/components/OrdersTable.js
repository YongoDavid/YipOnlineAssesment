import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading, Spinner, Button, Badge,Flex,Icon,Text} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    
    // Update the sort state based on the field
    if (field === 'date') {
      setSort('date');
    } else if (field === 'price') {
      setSort('price');
    }
  };

  // Memoize the filtered and sorted orders
  const processedOrders = useMemo(() => {
    return orders
      .filter(order => !filter || order.status === filter)
      .sort((a, b) => {
        if (!sort) return 0;
        if (sort === 'date') {
          return sortDirection === 'asc' 
            ? new Date(a.timestamp) - new Date(b.timestamp)
            : new Date(b.timestamp) - new Date(a.timestamp);
        }
        if (sort === 'price') {
          return sortDirection === 'asc'
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice;
        }
        return 0;
      });
  }, [orders, filter, sort, sortDirection]);

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
      <Table variant="simple" size="lg" borderCollapse="collapse">
        <Thead>
          <Tr bg="#f8f9fa">
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('id')}
              cursor="pointer"
            >
              <Flex align="center">
                Order ID
                  <Flex direction="column" ml={1}>
                    <Icon as={ChevronUpIcon} w={3} h={3} color={sortField === 'id' && sortDirection === 'asc' ? 'black' : 'gray.400'} />
                    <Icon as={ChevronDownIcon} w={3} h={3} mt="-2px" color={sortField === 'id' && sortDirection === 'desc' ? 'black' : 'gray.400'} />
                  </Flex>
              </Flex>
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('date')}
              cursor="pointer"
            >
              Customer
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              cursor="pointer"
            >
              <Flex align="center">
                Items
                <Flex direction="column" ml={1}>
                  <Icon as={ChevronUpIcon} w={3} h={3} color="gray.400" />
                  <Icon as={ChevronDownIcon} w={3} h={3} mt="-2px" color="gray.400" />
                </Flex>
              </Flex>
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('price')}
              cursor="pointer"
            >
              <Flex align="center">
                Total
                <Flex direction="column" ml={1}>
                  <Icon as={ChevronUpIcon} w={3} h={3} color={sortField === 'price' && sortDirection === 'asc' ? 'black' : 'gray.400'} />
                  <Icon as={ChevronDownIcon} w={3} h={3} mt="-2px" color={sortField === 'price' && sortDirection === 'desc' ? 'black' : 'gray.400'} />
                </Flex>
              </Flex>
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              cursor="pointer"
            >
              <Flex align="center">
                Status
                {/* <Flex direction="column" ml={1}>
                  <Icon as={ChevronUpIcon} w={3} h={3} color="gray.400" />
                  <Icon as={ChevronDownIcon} w={3} h={3} mt="-2px" color="gray.400" />
                </Flex> */}
              </Flex>
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('date')}
              cursor="pointer"
            >
              <Flex>
                Timestamp
                <Flex direction="column" ml={1}>
                  <Icon as={ChevronUpIcon} w={3} h={3} color={sortField === 'date' && sortDirection === 'asc' ? 'black' : 'gray.400'} />
                  <Icon as={ChevronDownIcon} w={3} h={3} mt="-2px" color={sortField === 'date' && sortDirection === 'desc' ? 'black' : 'gray.400'} />
                </Flex>
              </Flex>
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('id')}
              cursor="pointer"
            >Actions</Th>
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
