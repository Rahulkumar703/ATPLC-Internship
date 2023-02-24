import React, { useContext } from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'
// import userContext from '../Context/User/userContext'
import taskContext from '../Context/Tasks/taskContext'
import TaskCard from '../Components/TaskCard'

export default function Dashboard() {


    // const { userState } = useContext(userContext);
    const { taskState } = useContext(taskContext);



    const totalTasks = taskState.length;



    const pendingTasks = 1



    return (
        <section className='page dashboard-page'>
            <div className="title">
                <h3>Dashboard</h3>
            </div>
            <div className="score-card-container grid">
                <Card
                    heading='Verified Submission'
                    icon="insights"
                    obtainedScore={totalTasks - pendingTasks}
                    totalScore={totalTasks}
                />
                <Card
                    heading='Pending Tasks'
                    icon="pending"
                    obtainedScore={pendingTasks}
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
                {
                    taskState.slice(0, totalTasks - 1).map(task => {
                        return <TaskCard
                            isRecent={0}
                            key={task.id}
                            {...task}
                        />
                    }).reverse()
                }
            </div>
        </section>
    )
}
