import React from 'react'
import Card from '../Components/Card'
import './CommonPage.css'
import './Dashboard.css'

export default function Dashboard() {
    return (
        <main className='page dashboard-page'>
            <div className="score-card">
                <Card heading='Overall Tasks' icon="insights" obtainedScore={23} totalScore={45} />
                <Card heading='Pending Tasks' icon="pending" obtainedScore={12} totalScore={45} />
                <Card heading='Rejected Tasks' icon="error" obtainedScore={10} totalScore={45} />
            </div>
        </main>
    )
}
