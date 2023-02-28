import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'
import taskContext from '../Context/Tasks/taskContext'
import TaskCard from '../Components/TaskCard'
import userContext from '../Context/User/userContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {

    const params = useParams();
    const { taskState, setTaskState } = useContext(taskContext);
    const [isLoading, setIsloading] = useState(false);


    let totalTasks = 0;

    let completedTasks = 0;


    const fetchData = async () => {
        setIsloading(true);
        try {
            const response = await axios.post('https://atplc20.pythonanywhere.com/dashboard', {
                course: params.id,
                Username: JSON.parse(localStorage.getItem('user')).userId
            });


            console.log(response.data);

            await setTaskState(response.data)


            totalTasks = response.data.Tasks.length;

            completedTasks = response.data.Completed_Tasks[0].No_of_Completed_Tasks;

        }
        catch (error) {
            console.log(error);
        }

        setIsloading(false);

    }

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            window.location.assign('/')
        }
        console.log(params.id);
        fetchData();

    }, [])




    return (
        !isLoading &&
        <section className='page dashboard-page'>
            <div className="title">
                <h3>Dashboard</h3>
            </div>
            <div className="score-card-container grid">
                <Card
                    heading='Verified Submission'
                    icon="insights"
                    obtainedScore={completedTasks}
                    totalScore={totalTasks}
                />
                <Card
                    heading='Pending Tasks'
                    icon="pending"
                    obtainedScore={totalTasks - completedTasks}
                    totalScore={totalTasks}
                />
            </div>
            <div className="title">
                <h3>Recent Task</h3>
            </div>
            <div className="recent-task-container">
                <TaskCard
                    isRecent={1}
                    {...taskState[totalTasks - 1]}
                />
            </div>
            <div className="title">
                <h3>Previous Tasks</h3>
            </div>
            <div className="task-list-container grid">
                {/* {
                    taskState.slice(0, totalTasks - 1).map(task => {
                        return <TaskCard
                            isRecent={0}
                            key={task.id}
                            {...task}
                        />
                    }).reverse()
                } */}
            </div>
        </section>
    )
}
