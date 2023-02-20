import React, { useContext, useState } from 'react'
import './SubmitSolution.css'
// import userContext from '../Context/User/userContext'
import taskContext from '../Context/Tasks/taskContext';


export default function SubmitSolution({ id, value, type, placeholder }) {

    // const { userState, setUserState } = useContext(userContext);
    const { taskState, setTaskState } = useContext(taskContext);

    const [inputValue, setInputValue] = useState(value);
    const [isDisabled, setisDisabled] = useState(value !== '');

    const handleChange = (e) => {
        setInputValue(e.target.value)

    }
    const handleEdit = () => {
        setisDisabled(false);
    }
    const handleSubmit = () => {
        let updatedList = taskState.map(task => {
            if (task.id === id && task.solution !== inputValue) {
                return { ...task, solution: inputValue, status: 'pending' }; //gets everything that was already in task, and updates "done"
            }
            return task; // else return unmodified item 
        });
        setTaskState(updatedList);
        setisDisabled(true);
    }

    return (
        <div className="submit-solution">
            <div className="input-box">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={inputValue}
                    disabled={isDisabled}
                    onChange={handleChange} />
            </div>
            <div className="action-buttons">
                {
                    (!isDisabled) ?
                        <div className="solution-action-button" onClick={handleSubmit}>
                            <div className="icon">
                                <span className="material-symbols-rounded">
                                    check
                                </span>
                            </div>
                        </div>
                        :
                        <div className="solution-action-button" onClick={handleEdit}>
                            <div className="icon">
                                <span className="material-symbols-rounded" >
                                    edit
                                </span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
