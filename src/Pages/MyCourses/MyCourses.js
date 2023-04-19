import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import './MyCourses.css';
import CourseCard from '../../Components/CourseCard/CourseCard';
import Loader from '../../Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import Error from '../Error/Error'

export default function Courses() {
    const [isLoading, setIsLoading] = useState(true);
    const [myCourses, setMyCourses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "ATPLC | My Courses"
        document.getElementsByTagName("META")[2].content = 'All Your Courses at one place'
        window.scrollTo(0, 0);
    }, [])

    const fetchCourses = useCallback(async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/my-courses`, {
                Username: JSON.parse(localStorage.getItem('user')).userId,
            });
            setMyCourses(data);
            localStorage.setItem('courses', JSON.stringify(data))
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!localStorage.getItem('user')) {
            navigate('/login', { replace: true });
        }
        fetchCourses();
    }, [fetchCourses, navigate]);

    const courseCards = useMemo(() =>
        myCourses.map((course) => (
            <CourseCard
                key={course.Courses_id}
                id={course.Courses_id}
                courseName={course.Courses__Course_Name}
                courseDuration={0}
                courseCompletionStatus={course.Courses_Completed}
                coverImage={
                    course.Courses__Course_Thumbnail.startsWith('/media')
                        ? course.Courses__Course_Thumbnail
                        : '/media/' + course.Courses__Course_Thumbnail
                }
                couresPrice={null}
                courseTechnologies={null}
            />
        )),
        [myCourses]
    );

    return (
        <section className='page my-courses-page'>
            <div className='page-heading'>
                <h3>My Courses</h3>
            </div>

            {error === '' ? (
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='courses-grid'>{courseCards}</div>
                )
            ) : (
                <Error error={error} />
            )}
        </section>
    );
}
