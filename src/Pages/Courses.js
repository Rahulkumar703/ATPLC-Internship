import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../Components/CourseCard'
import './Courses.css'
import Loader from '../Components/Loader';

export default function Courses() {
    const [isloading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://atplc20.pythonanywhere.com/courses?format=json');
            setCourses(response.data.courses)
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [])
    return (

        <section className='page courses-page'>
            {
                isloading ? <Loader /> :
                    courses.map(course => {
                        return <CourseCard
                            key={course.id}
                            courseName={course.Course_Name}
                            courseDuration={`${course.Course_Duration} Month`}
                            coverImage="https://100offdeal.online/wp-content/uploads/2020/07/Become-a-complete-developer.jpg"
                        />
                    })
            }
        </section>
    )
}
