import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../CommonPage.css'
import './Dashboard.css'
import TaskCard from '../../Components/TaskCard/TaskCard'
import Card from '../../Components/ProgressCard/ProgressCard'
import Loader from '../../Components/Loader/Loader'
import Error from '../Error/Error'
import CourseFeedback from '../../Components/Feedback/CouseFeedback/CourseFeedback'
import Certificate from '../../Components/Certificate/Certificate'

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [isLoading, setIsloading] = useState(true);
    const [taskData, setTaskData] = useState([]);
    const [completedTask, setCompletedTask] = useState(0);


    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login', { replace: true })
        }
    }, [navigate])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (taskData?.Submissions) {
            let count = 0;
            taskData.Submissions.forEach(sub => {
                if (sub.Task_Status === "Approved") {
                    count++;
                }
            });
            setCompletedTask(count);
        }
    }, [taskData]);

    useEffect(() => {
        async function getTasks() {
            try {
                setIsloading(true);
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/dashboard`, {
                    course: location.state.id,
                    Username: JSON.parse(localStorage.getItem('user')).userId
                });
                setTaskData(data);
            } catch (e) {
                setError(e);
                console.log(e);
            }
            finally {
                setIsloading(false);
            }
        }
        getTasks();
    }, [location]);

    return (
        isLoading ?
            <Loader />
            :
            <section className='page dashboard-page'>
                <div className="page-heading">
                    <h3>{location.state?.courseName}</h3>
                </div>
                {error === '' ?
                    <div className="page-body">
                        <div className="score-card-container grid">
                            <Card
                                heading='Verified Submission'
                                icon="fi fi-rr-list-check"
                                obtainedScore={completedTask}
                                totalScore={taskData.Tasks?.length || 0}
                            />
                            <Card
                                heading='Pending Tasks'
                                icon="fi fi-rr-info"
                                obtainedScore={taskData.Tasks?.length - completedTask}
                                totalScore={taskData.Tasks?.length || 0}
                            />
                        </div>
                        <div className="page-body-heading">
                            <h4>Course Tasks</h4>
                        </div>
                        <div className="task-list-container grid">
                            {
                                taskData?.Tasks?.map(task => {
                                    const submittedTask = taskData.Submissions?.find(sub => {
                                        return sub.Task_No_id === task.id;
                                    });
                                    return (
                                        <TaskCard
                                            key={task.Task_No}
                                            sub={submittedTask}
                                            courseId={location.state.id}
                                            Task_No={task.Task_No}
                                            Task_Id={task.id}
                                            Task_Topic={task.Task_Topic}
                                            Task_Content={task.Task_Content}
                                            Task_Status={submittedTask?.Task_Status || ''}
                                            Code_Link={submittedTask?.Code_Link || ''}
                                            Output_Link={submittedTask?.Output_Link || ''}
                                            Remarks={submittedTask?.Remarks || ''}
                                        />
                                    )
                                })
                            }
                        </div>

                        <CourseFeedback />
                        <Certificate completedTask={completedTask} totalTask={taskData?.Tasks.length} />


                    </div>
                    :
                    <Error error={error} />
                }
            </section>

    )
}
