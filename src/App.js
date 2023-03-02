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
import MyCourses from './Pages/MyCourses';
import Login from './Pages/Login';
import Courses from './Pages/Courses';

function App() {

  const { userState } = useContext(userContext);

  return (
    <div className="App">

      {/* Header */}
      <Header />

      {/* Main */}
      <main>
        <Routes>

          {/* Route For Home */}
          <Route exact path="/" element={<Home />} />

          {/* Route For Login */}
          <Route path="/login" element={<Login />} />

          {/* Route For Courses */}
          <Route path="/courses" element={<Courses />} />

          {/* Route For My-Courses */}
          <Route path="/my-courses" element={<MyCourses />} />
          {/* Route For My Specific Courses */}
          <Route path="/my-courses/:id" element={<Dashboard />} />

          {/* Route For Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Route For 404 Error Page */}
          <Route path="*" element={<Error />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
