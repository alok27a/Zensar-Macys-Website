import './App.css';
import UserState from './context/users/UserState';
import Home from './pages/home/Home';


function App() {
  return (
    <>
      <UserState>
        {/* Rendering home page component */}
        <Home />
      </UserState>
    </>
  );
}

export default App;