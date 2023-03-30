import './App.css';
import { createRoutesFromElements, RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
// layouts
import RootLayout from './Layouts/RootLayout';
import MyCoursesLayout from './Layouts/MyCoursesLayout';
import ProfileLayout from './Layouts/ProfileLayout';
// Pages
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Courses from './Pages/Courses/Courses'
import MyCourses from './Pages/MyCourses/MyCourses'
import Dashboard from './Pages/Dashboard/Dashboard'
import Task from './Pages/Task/Task'
import Profile from './Pages/Profile/Profile'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Gallery from './Pages/Gallery/Gallery'
import Internship from './Pages/Internship/Internship'
import NotFound from './Pages/NotFound/NotFound'
import Enroll from './Pages/Enroll/Enroll'
import Feedback from './Pages/Feedback/Feedback';
import Events from './Pages/Events/Events';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route Route path='/' element={< RootLayout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="courses" element={<Courses />} />
        <Route path="events" element={<Events />} />

        <Route path="my-courses" element={<MyCoursesLayout />}>
          <Route index element={<MyCourses />} />
          <Route path=":courseName" element={<Dashboard />} />
        </Route>

        <Route path="task/:taskName" element={<Task />} />

        <Route path="profile" element={<ProfileLayout />} >
          <Route index element={<Profile />} />
          <Route path='update-password' element={<ChangePassword />} />
        </Route>
        <Route path="gallery" element={<Gallery />} />
        <Route path="internship" element={<Internship />} />
        <Route path="enroll/:course" element={<Enroll />} />
        <Route path="feedbacks" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
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
