import React, { useContext } from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'
import userContext from '../Context/User/userContext'

export default function Dashboard() {
    const { userState } = useContext(userContext);
    return (
        <main className='page dashboard-page'>
            <div className="score-card">
                <Card heading='Submited Tasks' icon="insights" obtainedScore={userState.user.submittedTasks} totalScore={userState.user.totalTasks} />
                <Card heading='Pending Tasks' icon="pending" obtainedScore={userState.user.pendingTasks} totalScore={userState.user.totalTasks} />
            </div>
        </main>
    )
}
