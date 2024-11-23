import "./index.css"
const TaskItem=(props)=>{
    const {taskDetails,updateTasksList}=props 
    const {id,name,description,status,duedate}=taskDetails
    const onDeleteTask=()=>{
        updateTasksList(id)
    }
    return <li className="task-item">
        <h1 className="task-heading">{name}</h1>
        <p className="task-description">Description : {description}</p>
        <p>Status : {status}</p>
        <p>Due date : {duedate}</p>
        <button type="button" onClick={onDeleteTask} className="delete-button">Delete</button>
    </li>
    
}
export default TaskItem