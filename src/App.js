import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [taskArray, setTaskArray] = useState(() => {
    const taskArraySaved = JSON.parse(localStorage.getItem('taskArray'));
    return taskArraySaved || [];
  });
  const [task, setTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [onClickTask, setOnClickTask] = useState('');
  const [onClickTaskDescription, setOnClickTaskDescription] = useState('');
  const [onClickDeadline, setOnClickDeadline] = useState('');
  const [index, setIndex] = useState(0);
  const [add, setAdd] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [submitButtonStatus, setSubmitButtonStatus] = useState('Fill the required fields');

  useEffect(() => {
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
  },[taskArray]);

  useEffect(() => {
    if(task && taskDescription && deadline) {
      setSubmitButtonStatus('Submit');
    }
  }, [task, taskDescription, deadline]);

  const addTask = () => {
    setAdd(1);
    setShowInfo(false);
  }
  const submit = () => {
    setTaskArray([...taskArray, {
      task: task,
      taskDescription: taskDescription,
      deadline: deadline,
      checked: false,
    }])
    setTask('');
    setTaskDescription('');
    setDeadline('');
    setSubmitButtonStatus('Fill the required fields')
    setAdd(0);
  }
  const handleTaskChange = (e) => setTask(e.target.value);
  const handleTaskDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleDeadlineChange = (e) => setDeadline(e.target.value);

  const taskInfo = (task, taskDescription, deadline, index) => {
    setOnClickTask(task);
    setOnClickTaskDescription(taskDescription);
    setOnClickDeadline(deadline);
    setIndex(index);
    setShowInfo(true);
  }
  const closeInfo = () => {
    setShowInfo(false);
  }
  const deleteInfo = () => {
    setTaskArray([...taskArray.slice(0, index), ...taskArray.slice(index + 1)]);
    setShowInfo(false);
  }
  const handleCheckboxChange = (index) => {
    const updatedTasks = taskArray.map((task, i) => 
      index === i ? {...task, checked: !task.checked} : task
    );
    setTaskArray(updatedTasks);  
  }
  return (
    <div className="App">
      <h1>Task Management</h1>
      <div className='tasks'>
        <div className='taskHeader'>
              <h2>Tasks</h2>
        </div>
        {taskArray.length === 0 && (
            <p>No task Currently</p>
        )}
        {taskArray.length !== 0 && (
            taskArray.map((tasks, index) => {
              return <div className='container'>     
                        <div className='taskContainer' key={index}>
                            <input 
                              type='checkbox' 
                              checked={tasks.checked}
                              onChange={() => handleCheckboxChange(index)}
                            />  
                              {tasks.checked ? (
                                <p style={{textDecorationLine: 'line-through'}} onClick={() => taskInfo(tasks.task, tasks.taskDescription, tasks.deadline, index)}>
                                 {tasks.task}
                               </p>
                              ) : (
                                <p onClick={() => taskInfo(tasks.task, tasks.taskDescription, tasks.deadline, index)}>
                                 {tasks.task}
                               </p>
                              )}
                        </div>  
                    </div>
            })
        )}
      </div>
      {add === 0 && (
        <button className='buttonStyle' onClick={addTask}>Add Task</button>
      )}
      {add > 0 && (
        <div className='taskForm'>
          <div className='input'>
            <p>Task: </p>
            <input placeholder='Input task...' onChange={handleTaskChange} type='text' ></input>
          </div>
          <div className='input'>
            <p>Task Description: </p>
            <textarea placeholder='Input task description...' onChange={handleTaskDescriptionChange} />
          </div>
          <div className='input'>
            <p>Deadline: </p>
            <input onChange={handleDeadlineChange} type='date' ></input>
          </div>
          <button className='buttonStyle' onClick={submit} disabled={!task || !taskDescription || !deadline}>{submitButtonStatus}</button>
        </div>
      )}
      {showInfo === true && (
        <div className='taskInfo'>
          <h1>Task Info</h1>
          <p>Task: {onClickTask}</p>
          <p>Task Description: {onClickTaskDescription}</p>
          <p>Deadline: {onClickDeadline}</p>
          <button className='buttonStyle' onClick={closeInfo}>Hide</button>
          <button className='buttonStyle' onClick={deleteInfo}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default App;
