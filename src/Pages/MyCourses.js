import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../Components/CourseCard'
import './MyCourses.css'
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

export default function Courses() {

    const [isloading, setIsLoading] = useState(true);
    const [myCourses, setMyCourses] = useState([]);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://atplc20.pythonanywhere.com/my-courses', { Username: JSON.parse(localStorage.getItem('user')).username });
            setMyCourses(response.data)
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

        <section className='page my-courses-page'>
            <div className="page-heading">
                <h3>My Courses</h3>
            </div>
            <div className="courses-grid">
                {
                    isloading ? <Loader /> :
                        myCourses.map(course => {
                            return <CourseCard
                                key={course.Course_id}
                                id={course.Course_id}
                                courseName={course.Course__Course_Name}
                                courseDuration={0}
                                courseCompletionStatus={course.Course_Completed}
                                coverImage={course.Course__Course_Thumbnail.startsWith('/media') ? course.Course__Course_Thumbnail : '/media/' + course.Course__Course_Thumbnail}
                            />
                        })
                }</div>
        </section>
    )
}
