import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../CommonPage.css'
import './Dashboard.css'
import TaskCard from '../../Components/TaskCard/TaskCard'
import Card from '../../Components/ProgressCard/ProgressCard'
import Loader from '../../Components/Loader/Loader'
import Error from '../Error/Error'

export default function PublicDashborad() {

    const { userId, courseId } = useParams();

    const [error, setError] = useState('');

    const [isLoading, setIsloading] = useState(true);
    const [taskData, setTaskData] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const [profile, setProfile] = useState({});




    useEffect(() => {
        document.title = `ATPLC | Dashboard`
        document.getElementsByTagName("META")[2].content = 'See all work of a students.'
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (taskData?.Submissions) {
            const approvedTasks = taskData.Submissions.filter(sub => {
                return sub.Task_Status === "Approved";
            });

            var uniqueSubmissions = [];
            approvedTasks.forEach(function (item) {
                var i = uniqueSubmissions.findIndex(task => task.Task_No_id === item.Task_No_id);
                if (i <= -1) {
                    uniqueSubmissions.push(item);
                }
            });

            setCompletedTask(uniqueSubmissions);
        }
    }, [taskData]);

    useEffect(() => {
        async function getTasks() {
            try {
                setIsloading(true);
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/dashboard`, {
                    course: courseId,
                    Username: userId
                });

                const profile = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/profile`, {
                    Username: userId,
                })
                if (profile.data.response) {
                    setProfile({
                        Name: profile.data.response[0].Name,
                        College: profile.data.response[0].College_Name,
                        Branch: profile.data.response[0].Branch
                    })
                }
                setTaskData(data);
            } catch (e) {
                if (e.response.status === 500)
                    setError({
                        response: {
                            statusText: "Invalid Task Link",
                            status: 400
                        }
                    });
                else setError(e);
            }
            finally {
                setIsloading(false);
            }
        }
        getTasks();
    }, [userId, courseId]);

    return (
        isLoading ?
            <Loader />
            :
            <section className='page dashboard-page'>
                <div className="page-heading">
                    <h3 className='user-name'>
                        {
                            profile.Name
                        }
                    </h3>
                    <p className='college-name'>
                        {
                            profile.College
                        }
                    </p>
                </div>
                {
                    error === '' ?
                        <div className="page-body" >
                            <div className="score-card-container grid">
                                <Card
                                    heading='Verified Submission'
                                    icon="fi fi-rr-list-check"
                                    obtainedScore={completedTask.length}
                                    totalScore={taskData.Tasks?.length || 0}
                                />
                                <Card
                                    heading='Pending Tasks'
                                    icon="fi fi-rr-info"
                                    obtainedScore={taskData.Tasks?.length - completedTask.length}
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
                                                courseId={courseId}
                                                Task_No={task.Task_No}
                                                Task_Topic={task.Task_Topic}
                                                Task_Content={task.Task_Content}
                                                Task_Status={submittedTask?.Task_Status || ''}
                                                Code_Link={submittedTask?.Code_Link || ''}
                                                Output_Link={submittedTask?.Output_Link || ''}
                                            />
                                        )
                                    })
                                }
                            </div>



                        </div>
                        :
                        <Error error={error} />
                }
            </section>

    )
}
