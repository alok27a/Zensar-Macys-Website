import './App.css';
import UserState from './context/users/UserState';
import Home from './pages/home/Home';
import Output from './pages/output/Output';


function App() {
  return (
    <>
      <UserState>
        {/* Rendering home page components */}
        <Home />
        {/* Rendering output page components*/}
        <Output/>
      </UserState>
    </>
  );
}

export default App;