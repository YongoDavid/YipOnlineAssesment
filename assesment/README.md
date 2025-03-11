# Orders Dashboard

A React-based orders management dashboard built with Chakra UI, featuring real-time order status updates and efficient data handling.

### Key Features
- Lazy loading implementation for improved performance
- Real-time order status updates without page refresh
- Advanced filtering and sorting capabilities
- Responsive table design with sortable columns
- Memoized components for optimal rendering

### Technical Decisions
- Used mock data (JSON) instead of API for:
  - Quick development and testing
  - Consistent data during development
  - Offline development capability
  - Easy data structure modifications

### Resolved Challenges
- Implemented React.memo() to prevent unnecessary re-renders
- Fixed state management issues in FilterSortControls
- Resolved component prop drilling with proper state management
- Optimized table performance with lazy loading
- Addressed theme consistency issues with Chakra UI

### Tech Stack
- React
- Chakra UI
- JavaScript