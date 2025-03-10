import { 
  Button, 
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex
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
  return (
    <Box mb={6}>
      <HStack spacing={3}>
        {/* Sort by Menu */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            leftIcon={
              <Flex alignItems="center" mr={-1}>
                <TriangleUpIcon boxSize={2.5} mb={-0.5} />
                <TriangleDownIcon boxSize={2.5} mt={-0.5} />
              </Flex>
            }
            bg="white"
            color="gray.700"
            fontWeight="medium"
            px={4}
            py={2}
            borderRadius="lg"
            _hover={{ bg: 'gray.50' }}
            boxShadow="sm"
          >
            Sort by
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSort('date')}>Date</MenuItem>
            <MenuItem onClick={() => setSort('price')}>Total Price</MenuItem>
          </MenuList>
        </Menu>

        {/* Filter Menu */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            leftIcon={<HamburgerIcon />}
            bg="white"
            color="gray.700"
            fontWeight="medium"
            px={4}
            py={2}
            borderRadius="lg"
            _hover={{ bg: 'gray.50' }}
            boxShadow="sm"
          >
            Filter
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setFilter('Pending')}>Pending</MenuItem>
            <MenuItem onClick={() => setFilter('Completed')}>Completed</MenuItem>
          </MenuList>
        </Menu>

      </HStack>
    </Box>
  );
}

export default FilterSortControls;