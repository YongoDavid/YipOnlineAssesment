import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Box, 
  Heading, 
  Spinner, 
  Button, 
  Badge,
  Flex,
  Icon,
  Text,
  useBreakpointValue,
  Stack,
  Card,
  CardBody,
  Grid,
  GridItem,
  VStack,
  HStack,
  Divider,
  IconButton
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
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

  // Move all useBreakpointValue calls to the top level
  const displayMode = useBreakpointValue({ base: "card", md: "table" });
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const resetButtonSize = useBreakpointValue({ base: "sm", md: "md" });
  const cellFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const spinnerSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonWidth = useBreakpointValue({ base: "full", sm: "auto" });
  const rowButtonSize = useBreakpointValue({ base: "xs", md: "sm" });

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

  // Render table view for larger screens - No hooks inside this function
  const renderTableView = () => (
    <Box overflowX="auto">
      <Table variant="simple" size={tableSize} borderCollapse="collapse">
        <Thead>
          <Tr bg="#f8f9fa">
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('id')}
              cursor="pointer"
              color="black"
              fontSize={cellFontSize}
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
              color="black"
              fontSize={cellFontSize}
            >
              Customer
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              cursor="pointer"
              color="black"
              display={{ base: "none", lg: "table-cell" }}
              fontSize={cellFontSize}
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
              color="black"
              fontSize={cellFontSize}
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
              color="black"
              fontSize={cellFontSize}
            >
              <Flex align="center">
                Status
              </Flex>
            </Th>
            <Th
              py={4} 
              borderBottom="1px solid #e2e8f0"
              onClick={() => handleSort('date')}
              cursor="pointer"
              color="black"
              display={{ base: "none", lg: "table-cell" }}
              fontSize={cellFontSize}
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
              cursor="pointer"
              color="black"
              fontSize={cellFontSize}
            >
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <Tr key={order.id}>
                <Td color="black" fontSize={cellFontSize}>{order.id}</Td>
                <Td color="black" fontSize={cellFontSize}>{order.customer}</Td>
                <Td color="black" display={{ base: "none", lg: "table-cell" }} fontSize={cellFontSize}>
                  {order.items.join(", ")}
                </Td>
                <Td color="black" fontSize={cellFontSize}>${order.totalPrice.toFixed(2)}</Td>
                <Td color="black" fontSize={cellFontSize}>
                  <Badge colorScheme={
                    order.status === 'Pending' ? 'yellow' : 
                    order.status === 'Completed' ? 'green' : 'blue'
                  }>
                    {order.status}
                  </Badge>
                </Td>
                <Td color="black" display={{ base: "none", lg: "table-cell" }} fontSize={cellFontSize}>
                  {new Date(order.timestamp).toLocaleString()}
                </Td>
                <Td>
                  <OrderStatusButton 
                    orderId={order.id}
                    status={order.status}
                    onOrderStatusChange={handleOrderStatusChange}
                    size={rowButtonSize}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="7" textAlign="center">No orders available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );

  // Render card view for mobile screens - No hooks inside this function
  const renderCardView = () => (
    <VStack spacing={4} align="stretch">
      {paginatedOrders.length > 0 ? (
        paginatedOrders.map((order) => (
          <Card key={order.id} variant="outline" shadow="sm">
            <CardBody p={4}>
              <VStack spacing={3} align="stretch">
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="sm">Order ID:</Text>
                  <Text fontSize="sm">{order.id}</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="sm">Customer:</Text>
                  <Text fontSize="sm">{order.customer}</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="sm">Total:</Text>
                  <Text fontSize="sm" fontWeight="medium">${order.totalPrice.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="sm">Status:</Text>
                  <Badge colorScheme={
                    order.status === 'Pending' ? 'yellow' : 
                    order.status === 'Completed' ? 'green' : 'blue'
                  }>
                    {order.status}
                  </Badge>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="sm">Date:</Text>
                  <Text fontSize="sm">{new Date(order.timestamp).toLocaleDateString()}</Text>
                </Flex>
                <Divider />
                <Box>
                  <Text fontWeight="bold" fontSize="sm" mb={1}>Items:</Text>
                  <Text fontSize="sm">{order.items.join(", ")}</Text>
                </Box>
                <Box alignSelf="flex-end">
                  <OrderStatusButton 
                    orderId={order.id}
                    status={order.status}
                    onOrderStatusChange={handleOrderStatusChange}
                    size="sm"
                  />
                </Box>
              </VStack>
            </CardBody>
          </Card>
        ))
      ) : (
        <Box textAlign="center" p={4}>No orders available</Box>
      )}
    </VStack>
  );

  return (
    <Box px={{ base: 2, md: 4 }}>
      <Heading 
        as="h1"
        mb={4}
        textAlign="center"
        color="black"
        fontSize={headingSize}
      >
        Orders Dashboard
      </Heading>
      
      <Flex 
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        mb={4}
      >
        <FilterSortControls 
          setFilter={setFilter} 
          setSort={setSort}
        />
        
        {/* Reset button - only visible on tablet and up */}
        <Button
          leftIcon={<RepeatIcon />}
          onClick={() => {
            setFilter('');
            setSort('');
          }}
          bg="gray.100"
          color="gray.700"
          fontWeight="medium"
          size={resetButtonSize}
          borderRadius="lg"
          _hover={{ bg: 'gray.200' }}
          boxShadow="md"
          display={{ base: "none", sm: "flex" }}
          mt={{ base: 2, md: 0 }}
          ml={{ md: 2 }}
        >
          Reset Filters
        </Button>
      </Flex>
      
      {displayMode === "table" ? renderTableView() : renderCardView()}
      
      {loading && (
        <Box textAlign="center" mt={4}>
          <Spinner size={spinnerSize} />
        </Box>
      )}
      
      {!loading && hasMore && (
        <Box textAlign="center" mt={4} mb={4}>
          <Button 
            onClick={loadMore} 
            colorScheme="teal" 
            size={buttonSize}
            width={buttonWidth}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}