import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import OrdersTable from './components/OrdersTable';
import { ChakraProvider, Box, Container } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Container maxW="container.xl">
          <Router>
            <Switch>
              <Route exact path="/">
                <OrdersTable/>
              </Route>
            </Switch>
          </Router>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 
