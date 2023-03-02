const taskData = {
    "Tasks": [
        {
            "Task_No": 1,
            "Task_Topic": "HTML Heading",
            "Task_Content": "Make a webpage using heading tag of html which contains your basic information like college name, name, registration no, roll no and your short introduction."
        },
        {
            "Task_No": 2,
            "Task_Topic": "CSS Heading",
            "Task_Content": "Make a webpage using heading tag of html which contains your basic information like college name, name, registration no, roll no and your short introduction."
        }
    ],
    "Completed_Tasks": [
        {
            "No_of_Completed_Tasks": 0
        }
    ],
    "Submissions": [
        {
            "Task_No_id": 1,
            "Submission_Link": "https://github.com/Rahulkumar703/ATPLC-Training-Daily_Tasks/blob/main/task1.html",
            "Task_Status": "Under Review",
            "Remarks": ""
        }
    ]
}
// console.log(taskData);

taskData.Tasks.map(task => {
    const submittedTask = taskData.Submissions.find(sub => sub.Task_No_id === task.Task_No);

    const key = task.Task_No
    const Task_Status = submittedTask?.Task_Status || ''
    const Submission_Link = submittedTask?.Submission_Link || ''
    const Remarks = submittedTask?.Remarks || ''
    const Task_Topic = task.Task_Topic
    const Task_Content = task.Task_Content

    console.log(key, Task_Topic, Task_Content, Task_Status, Submission_Link, Remarks);

})