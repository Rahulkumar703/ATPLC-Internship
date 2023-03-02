import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../Components/CourseCard'
import './Courses.css'
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

export default function Courses() {

    const [isloading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();




    useEffect(() => {
        fetchCourses();
    }, [])

    async function fetchCourses() {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://atplc20.pythonanywhere.com/courses?format=json');
            setCourses(data.courses);
            console.log(data.courses[0].Course_Thumbnail);

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }


    return (

        <section className='page courses-page'>
            <div className="page-heading">Courses</div>
            {
                isloading ? <Loader /> :
                    <div className="courses-grid">
                        {courses.map(course => {
                            return <CourseCard
                                key={course.id}
                                id={course.id}
                                courseName={course.Course_Name}
                                courseDuration={course.Course_Duration}
                                coverImage={course.Course_Thumbnail}
                            />
                        })}
                    </div>
            }
        </section>
    )
}
