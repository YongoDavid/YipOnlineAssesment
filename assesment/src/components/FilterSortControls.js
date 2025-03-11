import { 
  Button, 
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
  useBreakpointValue
} from "@chakra-ui/react";
import { 
  ChevronDownIcon, 
  RepeatIcon,
  HamburgerIcon,
  TriangleUpIcon,
  TriangleDownIcon,
  ViewIcon
} from "@chakra-ui/icons";

function FilterSortControls({ setFilter, setSort }) {
  // Use responsive layout based on screen size
  const stackDirection = useBreakpointValue({ base: "column", sm: "row" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const buttonWidth = useBreakpointValue({ base: "full", sm: "auto" });
  const spacing = useBreakpointValue({ base: 2, sm: 3 });
  const iconSize = useBreakpointValue({ base: 2, md: 2.5 });
  
  return (
    <Box mb={6} w="100%">
      <Flex
        direction={stackDirection}
        spacing={spacing}
        gap={spacing}
        width="100%"
        justify={{ base: "stretch", sm: "flex-start" }}
      >
        {/* Sort by Menu */}
        <Menu placement="bottom">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            leftIcon={
              <Flex alignItems="center" mr={-1}>
                <TriangleUpIcon boxSize={iconSize} mb={-0.5} />
                <TriangleDownIcon boxSize={iconSize} mt={-0.5} />
              </Flex>
            }
            bg="white"
            color="gray.700"
            fontWeight="medium"
            px={4}
            py={2}
            size={buttonSize}
            width={buttonWidth}
            borderRadius="lg"
            _hover={{ bg: 'gray.50' }}
            boxShadow="md"
          >
            Sort by
          </MenuButton>
          <MenuList zIndex={10}>
            <MenuItem onClick={() => setSort('date')}>Date</MenuItem>
            <MenuItem onClick={() => setSort('price')}>Total Price</MenuItem>
          </MenuList>
        </Menu>

        {/* Filter Menu */}
        <Menu placement="bottom">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            leftIcon={<HamburgerIcon boxSize={iconSize} />}
            bg="white"
            color="gray.700"
            fontWeight="medium"
            px={4}
            py={2}
            size={buttonSize}
            width={buttonWidth}
            borderRadius="lg"
            _hover={{ bg: 'gray.50' }}
            boxShadow="md"
            mt={{ base: 2, sm: 0 }}
          >
            Filter
          </MenuButton>
          <MenuList zIndex={10}>
            <MenuItem onClick={() => setFilter('Pending')}>Pending</MenuItem>
            <MenuItem onClick={() => setFilter('Completed')}>Completed</MenuItem>
          </MenuList>
        </Menu>

        {/* Reset Button - Only visible on mobile */}
        <Button
          leftIcon={<RepeatIcon />}
          onClick={() => {
            setFilter('');
            setSort('');
          }}
          bg="gray.100"
          color="gray.700"
          fontWeight="medium"
          size={buttonSize}
          width={buttonWidth}
          borderRadius="lg"
          _hover={{ bg: 'gray.200' }}
          boxShadow="md"
          display={{ base: "flex", sm: "none" }}
          mt={2}
        >
          Reset
        </Button>
      </Flex>
    </Box>
  );
}

export default FilterSortControls;