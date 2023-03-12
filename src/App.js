import './App.css';
import { createRoutesFromElements, RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
// Pages
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Error from './Pages/Error'
import MyCourses from './Pages/MyCourses';
import Login from './Pages/Login';
import Courses from './Pages/Courses';
import Task from './Pages/Task';
// layouts
import RootLayout from './Layouts/RootLayout';
import MyCoursesLayout from './Layouts/MyCoursesLayout';
import ProfileLayout from './Layouts/ProfileLayout';
import ChangePassword from './Components/ChangePassword';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route Route path='/' element={< RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="courses" element={<Courses />} />

        <Route path="my-courses" element={<MyCoursesLayout />}>
          <Route index element={<MyCourses />} />
          <Route path=":courseName" element={<Dashboard />} />
        </Route>

        <Route path="task/:taskName" element={<Task />} />

        <Route path="profile" element={<ProfileLayout />} >
          <Route index element={<Profile />} />
          <Route path='update-password' element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    )

  )


  return (
    <div className="App">

      <RouterProvider router={router} />

    </div>
  );
}

export default App;
