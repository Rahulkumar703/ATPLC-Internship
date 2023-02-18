import React, { useContext, useState } from 'react'
import './SubmitSolution.css'
import userContext from '../Context/User/userContext'


export default function SubmitSolution({ value, type, placeholder }) {
    const { dispatch } = useContext(userContext);
    const [inputValue, setInputValue] = useState(value);
    const [isDisabled, setisDisabled] = useState(value !== '');
    const handleChange = (e) => {
        setInputValue(e.target.value)

    }
    const handleEdit = () => {
        setisDisabled(false)
    }
    const handleSubmit = () => {
        setisDisabled(true);
        if (value !== inputValue) {
            dispatch({ type: "UPDATE_SOLUTION", payload: inputValue })

        }

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
