import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Courses.css'
import CourseCard from '../../Components/CourseCard/CourseCard';
import Loader from '../../Components/Loader/Loader';
import Error from '../Error/Error';

export default function Courses() {

    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [courses, setCourses] = useState([]);




    useEffect(() => {
        fetchCourses();
    }, [])

    async function fetchCourses() {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_PATH}/courses?format=json`);
            setCourses(data.courses);

        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false);
        }
    }


    return (

        <section className='page courses-page'>
            <div className="page-heading">
                <h3>Courses</h3>
            </div>
            {
                error === '' ? isloading ? <Loader /> :
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
                    :
                    <Error error={error} />
            }
        </section>
    )
}
