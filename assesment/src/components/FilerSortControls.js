// Provide filtering & sorting UI.
import { Select, HStack } from "@chakra-ui/react";
const FilterSortControls = ({ filterStatus, setFilterStatus, sortOption, setSortOption }) => {
    return (
        <HStack spacing={4} mb={4}>
            <Select placeholder="Filter by Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </Select>
            <Select placeholder="Sort by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="date">Date</option>
                <option value="price">Total Price</option>
            </Select>
        </HStack>
    );
};

export default FilterSortControls;
