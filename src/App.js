import './App.css';
import UserState from './context/users/UserState';
import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LineChart from './components/charts/LineChart';
import HistoryLineChart from './components/charts/HistoryLineChart';
import GraphState from './context/graphs/GraphState';


function App() {
  return (
    <>
      <Router>
        <GraphState>
          <UserState>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/output1">
                < LineChart height={400} />
              </Route>
              <Route exact path="/output2">
                < HistoryLineChart height={400} />
              </Route>
            </Switch>
          </UserState>
        </GraphState>
      </Router>
    </>
  );
}

export default App;