import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../Components/CourseCard'
import './MyCourses.css'
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

export default function Courses() {

    const [isloading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://atplc20.pythonanywhere.com/my-courses', { Username: JSON.parse(localStorage.getItem('user')).username });
            setCourses(response.data)
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/', { replace: true })
        }
        fetchCourses();
    }, [])
    return (

        <section className='page courses-page'>
            {
                isloading ? <Loader /> :
                    courses.map(course => {
                        return <CourseCard
                            key={course.Course_id}
                            id={course.Course_id}
                            courseName={course.Course__Course_Name}
                            courseDuration={0}
                            courseCompletionStatus={course.Course_Completed}
                            coverImage={course.Course__Course_Thumbnail}
                        />
                    })
            }
        </section>
    )
}
