import "./index.css"
import {v4 as uuidv4} from "uuid"
import {useState} from "react"
import TaskItem from "../TaskItem"
const taskStatusList=[
    {id:"",displayText:""},
    {id:"PENDING",displayText:"Pending"},
    {id:"IN PROGRESS", displayText:"In Progress"},
    {id:"COMPLETED", displayText:"Completed"}
]

const getTasksFromLocalStorage=()=>{
    let stringifiedTasksList=localStorage.getItem("DailyTasks")
    let parsedTasksList=JSON.parse(stringifiedTasksList)
    if (parsedTasksList===null){
        return []
    }
    return parsedTasksList
}

let dailyTasks=getTasksFromLocalStorage()

const Taskslist=()=>{
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [status,setTaskStatus]=useState("")
    const[activeStatus,setActiveStatus]=useState("")
    const [duedate,setDueDate]=useState("")
    const [tasksList,setTasksList]=useState(dailyTasks)
    const[activeDueDate,setActiveDueDate]=useState("")

    const onChangeName=(event)=>{
        setName(event.target.value)
    }

    const onChangeDescription=(event)=>{
        setDescription(event.target.value)
    }

    const onChangeStatus=(event)=>{
        setTaskStatus(event.target.value)
    }
    
    const onChangeActiveStatus=(event)=>{
        setActiveStatus(event.target.value)
    }
    const onChangeDueDate=(event)=>{
        setDueDate(event.target.value)
    }
    const onChangeActiveDueDate=(event)=>{
        setActiveDueDate(event.target.value)
    }
    const onAddTask=(event)=>{
        event.preventDefault()
        const newTask={
            id:uuidv4(),
            name,
            description,
            status,
            duedate
        }
        setName("")
        setDescription("")
        setTaskStatus("")
        setDueDate("")
         
        setTasksList(prevState=>([...prevState,newTask]))
        dailyTasks.push(newTask)
    }
    
    const updateTasksList=(id)=>{
        const updatedTasksList=tasksList.filter(eachTask=>{
            return eachTask.id!==id
        })
        dailyTasks=updatedTasksList
        setTasksList(updatedTasksList)
    }

    const filteredTasksList=tasksList.filter(eachTask=>{
            if (activeStatus!=="" && activeDueDate===""){
                return eachTask.status===activeStatus
            }
            else if (activeDueDate!=="" && activeStatus===""){
                return eachTask.duedate===activeDueDate
            }
            else if (activeStatus==="" && activeDueDate===""){
                return eachTask
            }else{
                return (eachTask.status===activeStatus && eachTask.duedate===activeDueDate)
            }
    }
            
    )

    const onClickSaveBtn=()=>{
            
            localStorage.setItem("DailyTasks",JSON.stringify(dailyTasks))
    }
    return <div className="form-tasks-container"> 
            <form onSubmit={onAddTask} className="form-container">
                <div className="each-input">
                    <label htmlFor="taskName" className="label">Task</label><br/>
                     <input type="text" onChange={onChangeName} value={name} className="task-input" id="taskName"/>
                </div>
                
                 <div className="each-input">
                    <label htmlFor="taskDescription"  className="label">Description</label><br/>
                    <textarea rows="6"  type="text" onChange={onChangeDescription} value={description} 
                    className="task-input task-description-input" id="taskDescription"></textarea>
                </div>

                <div className="each-input">
                    <label htmlFor="taskStatus" className="label">Status</label> <br/>
                <select onChange={onChangeStatus} value={status} id="taskStatus" className="task-input">
                        {taskStatusList.map(eachitem=>
                            <option id={eachitem.id} value={eachitem.value} >{eachitem.displayText}</option>
                        )}
                </select>
                </div>
                 
                 <div className="each-input">
                    <label htmlFor="dueDate" className="label">Due Date</label><br/>
                    <input type="date" value={duedate} onChange={onChangeDueDate} className="task-input" id="dueDate"/>
                 </div>

                <button type="submit" className="add-task-btn">Add Task</button>
            </form>
            <div className="filters-container">
                <div>
                    <label>Filter By Status</label>
                    <select onChange={onChangeActiveStatus} value={activeStatus}>
                        {taskStatusList.map(eachitem=>
                            <option id={eachitem.id} value={eachitem.value} >{eachitem.displayText}</option>
                        )}
                </select>
                </div>
                <div>
                    <label>
                            Filter By Duedate
                    </label>
                    <input type="date" onChange={onChangeActiveDueDate} value={activeDueDate}/>
                </div>
                 
            </div> 
             
            <div class="heading-container">
                <h1>Daily Tasks </h1> 
                <button type="button" className="save-button" onClick={onClickSaveBtn}>Save</button>
            </div> 
             
            <ul className="tasks-container">
                 {
                    filteredTasksList.map(eachTask=>{
                        return <TaskItem taskDetails={eachTask} key={eachTask.id} updateTasksList={updateTasksList}/>
                    })
                 }
            </ul>
             
    </div>
}
export default Taskslist