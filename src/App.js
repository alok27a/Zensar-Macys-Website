import './App.css';
import UserState from './context/users/UserState';
import Home from './pages/home/Home';
import Output from './pages/output/Output';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
              <Output />
            </Route>
          </Switch>
        </UserState>
      </Router>
    </>
  );
}

export default App;