import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'
import TaskCard from '../Components/TaskCard'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader'

export default function Dashboard({ id, courseName }) {

    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsloading] = useState(false);
    const [taskData, setTaskData] = useState([]);





    async function getTasks() {
        try {
            setIsloading(true);
            const id = location.state.id;
            const { data } = await axios.post('https://atplc20.pythonanywhere.com/dashboard', {
                course: id,
                Username: JSON.parse(localStorage.getItem('user')).userId
            })
            setTaskData(data);
            setIsloading(false);
            // Logging API Data
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/', { replace: true })
        }
    }, [])

    useEffect(() => {
        getTasks();
        // Logging task State
        console.log(taskData);
    }, [])




    return (
        isLoading ? <Loader /> :
            <section className='page dashboard-page'>
                <div className="title">
                    <h3>{location.state.courseName}</h3>
                </div>
                <div className="score-card-container grid">
                    <Card
                        heading='Verified Submission'
                        icon="insights"
                        obtainedScore={taskData.Completed_Tasks[0].No_of_Completed_Tasks}
                        totalScore={taskData.Tasks.length}
                    />
                    <Card
                        heading='Pending Tasks'
                        icon="pending"
                        obtainedScore={taskData.Tasks.length - taskData.Completed_Tasks[0].No_of_Completed_Tasks}
                        totalScore={taskData.Tasks.length}
                    />
                </div>
                <div className="title">
                    <h3>Course Tasks</h3>
                </div>
                <div className="task-list-container grid">
                    {
                        taskData.Tasks.map(task => {
                            return taskData.Submissions.map(submittedTask => {
                                if (submittedTask.Task_No_id === task.Task_No)

                                    return <TaskCard
                                        isRecent={0}
                                        key={task.Task_No}
                                        {...task}
                                        Task_Status={submittedTask.Task_Status}
                                        Submission_Link={submittedTask.Submission_Link}
                                        Remarks={submittedTask.Remarks}

                                    />
                                else
                                    return <TaskCard
                                        isRecent={0}
                                        key={task.Task_No}
                                        {...task}
                                        Task_Status={''}
                                        Submission_Link={''}
                                        Remarks={''}
                                    />

                            })
                        })
                    }
                </div>
            </section>
    )
}
