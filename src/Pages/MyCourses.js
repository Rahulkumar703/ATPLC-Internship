import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import CourseCard from '../Components/CourseCard';
import './MyCourses.css';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import Error from '../Components/Error';

export default function Courses() {
    const [isLoading, setIsLoading] = useState(true);
    const [myCourses, setMyCourses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.post('https://atplc20.pythonanywhere.com/my-courses', {
                Username: JSON.parse(localStorage.getItem('user')).username,
            });
            setMyCourses(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/', { replace: true });
        }
        fetchCourses();
    }, [fetchCourses, navigate]);

    const courseCards = useMemo(() =>
        myCourses.map((course) => (
            <CourseCard
                key={course.Course_id}
                id={course.Course_id}
                courseName={course.Course__Course_Name}
                courseDuration={0}
                courseCompletionStatus={course.Course_Completed}
                coverImage={
                    course.Course__Course_Thumbnail.startsWith('/media')
                        ? course.Course__Course_Thumbnail
                        : '/media/' + course.Course__Course_Thumbnail
                }
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
