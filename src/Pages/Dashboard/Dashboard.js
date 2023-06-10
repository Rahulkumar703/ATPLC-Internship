import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../CommonPage.css'
import './Dashboard.css'
import TaskCard from '../../Components/TaskCard/TaskCard'
import Card from '../../Components/ProgressCard/ProgressCard'
import Loader from '../../Components/Loader/Loader'
import Error from '../Error/Error'
import CourseFeedback from '../../Components/Feedback/CouseFeedback/CourseFeedback'
import Certificate from '../../Components/Certificate/Certificate'
import { WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from 'react-share'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function Dashboard() {

    const params = useParams();

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [isLoading, setIsloading] = useState(true);
    const [taskData, setTaskData] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);


    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login', { replace: true })
        }
    }, [navigate])

    useEffect(() => {
        document.title = `Dashboard | ${params?.courseName}`
        document.getElementsByTagName("META")[2].content = 'All things at one place for your selected course.'
        window.scrollTo(0, 0);
    }, [params?.courseName])

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
                    course: params?.id,
                    Username: JSON.parse(localStorage.getItem('user')).userId
                });
                setTaskData(data);
            } catch (e) {
                setError(e);
            }
            finally {
                setIsloading(false);
            }
        }
        getTasks();
    }, [params?.id]);


    function copyLink() {
        const tooltip = document.querySelector('.tooltip');
        tooltip.innerText = 'copied';
        tooltip.addEventListener('mouseleave', () => tooltip.innerText = "copy")
    }


    return (
        isLoading ?
            <Loader />
            :
            <section className='page dashboard-page'>
                <div className="page-heading">
                    <h3>{params?.courseName}</h3>
                </div>
                {error === '' ?
                    <div className="page-body">
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
                            <div className="share-work">
                                <WhatsappShareButton
                                    title={`My ${params.courseName} Work at ATPLC`}
                                    url={`https://www.atplc.in/dashboard/${JSON.parse(localStorage.getItem('user')).userId}/${params.id}`}
                                >
                                    <WhatsappIcon round={true} size={40} iconFillColor='var(--bg)' />
                                </WhatsappShareButton>
                                <LinkedinShareButton
                                    title={`My ${params.courseName} Work at ATPLC`}
                                    summary="My all tasks and projects done during Training at @ATPLC"
                                    source="atplc.in"
                                    url={`https://www.atplc.in/dashboard/${JSON.parse(localStorage.getItem('user')).userId}/${params.id}`}
                                >
                                    <LinkedinIcon round={true} size={40} iconFillColor='var(--bg)' />
                                </LinkedinShareButton>
                                <CopyToClipboard text={`https://www.atplc.in/dashboard/${JSON.parse(localStorage.getItem('user')).userId}/${params.id}`} onCopy={(e) => console.log(e)}>
                                    <button className='copy-link' onClick={copyLink}>
                                        <i className="fi fi-rr-copy-alt"></i>
                                        <div className="tooltip">copy</div>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>

                        <div className="task-list-container grid">
                            {
                                taskData?.Tasks?.map(task => {
                                    const submittedTask = completedTask?.find(sub => {
                                        return sub.Task_No_id === task.id;
                                    });
                                    console.log(submittedTask);

                                    return (
                                        <TaskCard
                                            key={task.Task_No}
                                            sub={submittedTask}
                                            courseId={params?.id}
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

                        <Certificate
                            completedTask={completedTask.length}
                            totalTask={taskData?.Tasks.length}
                            courseName={params?.courseName}
                            courseId={params?.id}
                        />


                    </div>
                    :
                    <Error error={error} />
                }
            </section >

    )
}
