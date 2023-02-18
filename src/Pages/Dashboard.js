import React, { useContext } from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'
import userContext from '../Context/User/userContext'
import TaskCard from '../Components/TaskCard'

export default function Dashboard() {

    const { userState } = useContext(userContext);

    const totalTasks = userState.user.tasks.length;
    const pendingTasks = userState.user.tasks.filter((task) => {
        return task.isPending;
    }).length;


    return (
        <main className='page dashboard-page'>
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
                    {...userState.user.tasks[totalTasks - 1]}
                />
            </div>
            <div className="title">
                <h3>Previous Tasks</h3>
            </div>
            <div className="task-list-container grid">
                {userState.user.tasks.slice(0, totalTasks - 1).map(task => {
                    return <TaskCard
                        isRecent={0}
                        key={task.no}
                        {...task}
                    />
                }).reverse()}
            </div>
        </main>
    )
}
