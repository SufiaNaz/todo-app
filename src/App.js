import React, { useState, useEffect } from "react";

function App() {
  const saveEditedTask = (indexToSave) => {
    const updatedTasks = [...tasks];
    updatedTasks[indexToSave].text = editedText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedText("");
  };
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ?
    JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault(); // prevent page reload
    if (task.trim() === "") return; // ignore empty
    setTasks([...tasks, {text: task, completed: false }]); // add new task to list
    setTask(""); // clear input
  };
  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_,index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  const toggleTaskCompleted = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) =>
    index === indexToToggle? { ...task, completed: ! task.completed}
    :task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>📝 My To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Add Task
        </button>
      </form>

      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
  <strong>Total:</strong> {tasks.length} |{" "}
  <strong>Completed:</strong> {tasks.filter(t => t.completed).length} |{" "}
  <strong>Remaining:</strong> {tasks.filter(t => !t.completed).length}
</div>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((t, index) => (
          <li key={index} style={{ marginBottom: "8px",
          textDecoration: t.completed ? "line-through" : "none",
          color: t.completed ? "gray" : "black", }}>

            <input 
            type="checkbox"
            checked={t.completed}
            onChange={() =>
            toggleTaskCompleted(index)}
            style={{ mrginRight: "8px" }}
            />
            {editingIndex === index ? (
  <>
    <input
      type="text"
      value={editedText}
      onChange={(e) => setEditedText(e.target.value)}
      style={{ marginRight: "8px" }}
    />
    <button onClick={() => saveEditedTask(index)}>Save</button>
  </>
) : (
  <>
    {t.text}
    <button
      onClick={() => {
        setEditingIndex(index);
        setEditedText(t.text);
      }}
      style={{ marginLeft: "10px" }}
    >
      Edit
    </button>
  </>
)}

            <button onClick={() => handleDeleteTask(index)}
            style={{
              marginLeft: "10px",
              color: "white",
              backGroundColor: "red",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
            > ❌ </button>
        
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
