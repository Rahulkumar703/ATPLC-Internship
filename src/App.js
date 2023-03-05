import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import Task from './Pages/Task';

function App() {


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
          <Route path="/my-courses/:courseName" element={<Dashboard />} />

          {/* Route For Specific Task */}
          <Route path="/task/:taskName" element={<Task />} />

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
