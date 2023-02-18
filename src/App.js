import './App.css';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
// Contexts
import userContext from './Context/User/userContext';
// Components
import Header from './Components/Header';
// Pages
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Error from './Pages/Error'

function App() {

  const { userState } = useContext(userContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* For Home Route */}
        {
          userState.isLoggedIn ?
            <Route exact path="/" element={<Dashboard />} />
            :
            <Route exact path="/" element={<Home />} />
        }
        {/* Route For Profile */}
        <Route exact path="/profile" element={<Profile />} />
        {/* 404 Page Route */}
        <Route exact path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
