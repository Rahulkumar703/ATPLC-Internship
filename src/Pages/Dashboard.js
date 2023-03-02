import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'
import TaskCard from '../Components/TaskCard'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader'

export default function Dashboard() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsloading] = useState(true);
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        getTasks();
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/', { replace: true })
        }
    })



    async function getTasks() {
        try {
            setIsloading(true);
            const { data } = await axios.post('https://atplc20.pythonanywhere.com/dashboard', {
                course: location.state.id,
                Username: JSON.parse(localStorage.getItem('user')).userId
            })
            setTaskData(data);
        } catch (e) {
            console.log(e);
        }
        setIsloading(false);
    }

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
                    {taskData.Tasks.map(task => {
                        const submittedTask = taskData.Submissions.find(sub => sub.Task_No_id === task.Task_No);
                        return <TaskCard
                            key={task.Task_No}

                            Task_No={task.Task_No}
                            Task_Topic={task.Task_Topic}
                            Task_Content={task.Task_Content}
                            Task_Status={submittedTask?.Task_Status || ''}
                            Submission_Link={submittedTask?.Submission_Link || ''}
                            Remarks={submittedTask?.Remarks || ''}
                        />
                    })}
                </div>
            </section>
    )
}
