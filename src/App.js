import './App.css';
import UserState from './context/users/UserState';
import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LineChart from './components/charts/LineChart';


function App() {
  return (
    <>
      <Router>
        <UserState>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/output">
              < LineChart />
            </Route>
          </Switch>
        </UserState>
      </Router>
    </>
  );
}

export default App;