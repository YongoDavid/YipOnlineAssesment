import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import OrdersTable from './components/OrdersTable';
function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <OrdersTable/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App; 
