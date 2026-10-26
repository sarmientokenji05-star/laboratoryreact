import { useState } from "react";
import { Link } from "react-router-dom";

export default function Groups({ groups = [], addGroup }) {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!groupName.trim()) {
      setIsError(true);
      setMessage("Please enter a group name.");
      return;
    }
    const success = addGroup(groupName);
    setIsError(!success);
    setMessage(success ? "Group created successfully!" : "A group with that name already exists.");
    if (success) setGroupName("");
  }

  const totalTasks = groups.reduce((sum, group) => sum + group.tasks.length, 0);
  const totalCompleted = groups.reduce((sum, group) => sum + group.tasks.filter((task) => task.done).length, 0);

  return (
    <div className="page-stack">
      <section className="page-intro"><div><span className="eyebrow">TASKFLOW WORKSPACE</span><h1>My Groups</h1><p>Everything has its place. Create groups and keep your tasks organized.</p></div><div className="intro-icon">▦</div></section>
      <section className="create-panel"><div className="create-heading"><span className="create-icon">＋</span><div><h2>Create a new group</h2><p>Use groups to separate school, personal tasks, and projects.</p></div></div><form className="create-form" onSubmit={handleSubmit}><input value={groupName} onChange={(event) => { setGroupName(event.target.value); setMessage(""); }} placeholder="e.g. School assignments" aria-label="New group name" maxLength={60} /><button className="button button-primary" type="submit">＋ Create group</button></form>{message && <p className={`form-message ${isError ? "error" : "success"}`} role="status">{message}</p>}</section>
      <section className="stats-grid compact-stats"><SmallStat label="Total groups" value={groups.length} icon="▦" /><SmallStat label="Total tasks" value={totalTasks} icon="☷" /><SmallStat label="Completed tasks" value={totalCompleted} icon="✓" /></section>
      <section><div className="section-heading"><div><h2>Your groups</h2><p>Choose a group to view and manage its tasks.</p></div><span className="count-pill">{groups.length} groups</span></div>
        {groups.length ? <div className="groups-grid">{groups.map((group) => { const count = group.tasks.length; const done = group.tasks.filter((task) => task.done).length; const percent = count ? Math.round((done / count) * 100) : 0; return <Link to={`/groups/${group.id}`} key={group.id} className="group-card"><div className="group-card-top"><span className="group-emoji large">{group.icon || "📁"}</span><span className="task-count-pill">{count} {count === 1 ? "task" : "tasks"}</span></div><h3>{group.name}</h3><p className="group-subtitle">{done} completed <span>·</span> {count - done} pending</p><div className="progress-track small"><div className="progress-fill" style={{ width: `${percent}%` }} /></div><div className="group-card-bottom"><span>{percent}% complete</span><b>Open group <span>→</span></b></div></Link>; })}</div> : <div className="empty-state"><span>📁</span><h3>No groups yet</h3><p>Create your first group using the form above.</p></div>}
      </section>
    </div>
  );
}

function SmallStat({ label, value, icon }) {
  return <div className="stat-card compact-stat"><span className="small-stat-icon">{icon}</span><div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div></div>;
}
