import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GroupDetails({ groups = [], addTask, toggleTask, deleteTask }) {
  const { groupId } = useParams();
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const group = groups.find((item) => item.id === groupId);

  if (!group) return <div className="empty-state"><span>🔎</span><h2>Group not found</h2><p>This group may have been removed.</p><Link className="button button-primary" to="/groups">Back to groups</Link></div>;

  const filteredTasks = group.tasks.filter((task) => filter === "all" || (filter === "done" ? task.done : !task.done));
  const completed = group.tasks.filter((task) => task.done).length;

  function handleSubmit(event) {
    event.preventDefault();
    if (!taskTitle.trim()) { setMessage("Enter a task before adding it."); return; }
    addTask(group.id, taskTitle);
    setTaskTitle("");
    setMessage("Task added.");
  }

  return <div className="page-stack"><Link to="/groups" className="back-link">← Back to groups</Link><section className="detail-banner"><span className="detail-emoji">{group.icon || "📁"}</span><div><span className="eyebrow light">TASK GROUP</span><h1>{group.name}</h1><p>{group.tasks.length} tasks · {completed} completed · {group.tasks.length - completed} pending</p></div></section>
    <section className="create-panel"><div className="create-heading"><span className="create-icon">＋</span><div><h2>Add a task</h2><p>Break your work into small, actionable steps.</p></div></div><form className="create-form" onSubmit={handleSubmit}><input value={taskTitle} onChange={(event) => { setTaskTitle(event.target.value); setMessage(""); }} placeholder="What do you need to do?" aria-label="Task title" maxLength={160} /><button className="button button-primary" type="submit">＋ Add task</button></form>{message && <p className="form-message" role="status">{message}</p>}</section>
    <section className="panel task-panel"><div className="task-panel-heading"><div><h2>Tasks</h2><p>Mark tasks complete as you finish them.</p></div><div className="filter-tabs" role="group" aria-label="Filter tasks">{[{ id: "all", label: "All" }, { id: "pending", label: "Pending" }, { id: "done", label: "Done" }].map((item) => <button type="button" key={item.id} className={filter === item.id ? "filter-tab selected" : "filter-tab"} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div></div>
      {filteredTasks.length ? <ul className="task-list">{filteredTasks.map((task) => <li className={`task-row${task.done ? " task-done" : ""}`} key={task.id}><label className="task-label"><input type="checkbox" checked={task.done} onChange={() => toggleTask(group.id, task.id)} /><span className="custom-check" aria-hidden="true">✓</span><span className="task-title">{task.title}</span></label><span className={`status-pill ${task.done ? "status-done" : "status-pending"}`}>{task.done ? "Done" : "Pending"}</span><button type="button" className="delete-button" aria-label={`Delete ${task.title}`} onClick={() => deleteTask(group.id, task.id)}>×</button></li>)}</ul> : <div className="empty-state compact-empty"><span>✦</span><h3>{filter === "all" ? "No tasks yet" : `No ${filter} tasks`}</h3><p>{filter === "all" ? "Add your first task above to get started." : "Try another filter or add a new task."}</p></div>}
    </section></div>;
}
