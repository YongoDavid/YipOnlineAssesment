import { Select } from "@chakra-ui/react";

function FilterSortControls({ setFilter, setSort }) {
  return (
    <div>
      <Select placeholder="Filter by Status" onChange={(e) => setFilter(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </Select>
      <Select placeholder="Sort by" onChange={(e) => setSort(e.target.value)}>
        <option value="date">Date</option>
        <option value="price">Total Price</option>
      </Select>
    </div>
  );
}

export default FilterSortControls;
