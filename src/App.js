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
import Footer from './Components/Footer';

function App() {

  const { userState } = useContext(userContext);

  return (
    <div className="App">

      {/* Header */}
      <Header />

      {/* Main */}
      <Routes>

        {/* Route For Home */}
        <Route exact path="/" element={Object.entries(userState).length ? <Dashboard /> : <Home />} />

        {/* Route For Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Route For 404 Error Page */}
        <Route path="*" element={<Error />} />

      </Routes>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
