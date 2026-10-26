import { Link } from "react-router-dom";

export default function Home({ groups = [] }) {
  const tasks = groups.flatMap((group) => group.tasks.map((task) => ({ ...task, groupName: group.name })));
  const completed = tasks.filter((task) => task.done).length;
  const pending = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="page-stack">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="eyebrow light">YOUR PERSONAL PRODUCTIVITY SPACE</span>
          <h1>Make today <span>count.</span></h1>
          <p>Keep your tasks organized, focus on what matters, and celebrate every small win.</p>
          <Link className="button button-white" to="/groups">Explore my groups <span>→</span></Link>
        </div>
        <div className="welcome-art" aria-hidden="true"><div className="art-circle">✓</div><div className="art-note note-one">✓ Task completed</div><div className="art-note note-two">✦ Stay focused</div></div>
      </section>

      <section className="section-heading"><div><span className="eyebrow">YOUR OVERVIEW</span><h2>Dashboard</h2><p>A quick look at how you're doing today.</p></div><Link className="text-link" to="/groups">View groups →</Link></section>

      <section className="stats-grid">
        <StatCard icon="▤" label="Total tasks" value={tasks.length} tone="blue" hint="Across all groups" />
        <StatCard icon="✓" label="Completed" value={completed} tone="green" hint="Great work so far" />
        <StatCard icon="◷" label="Pending" value={pending} tone="orange" hint="One step at a time" />
        <StatCard icon="▦" label="Task groups" value={groups.length} tone="purple" hint="Your organized spaces" />
      </section>

      <section className="dashboard-columns">
        <div className="panel progress-panel"><div className="panel-title"><div><h3>Your progress</h3><p>Every completed task moves you forward.</p></div><span className="progress-number">{progress}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div><div className="progress-foot"><span>{completed} completed</span><span>{pending} remaining</span></div><div className="encouragement">{progress === 100 && tasks.length ? "Amazing! All tasks are complete. 🎉" : "Small steps lead to big results. Keep going! ✨"}</div></div>
        <div className="panel quick-panel"><div className="panel-title"><div><h3>Quick actions</h3><p>What would you like to do?</p></div></div><Link className="quick-action" to="/groups"><span className="quick-icon blue-bg">＋</span><span><b>Create or open a group</b><small>Organize tasks by category</small></span><span className="action-arrow">→</span></Link><Link className="quick-action" to="/guide"><span className="quick-icon purple-bg">?</span><span><b>Read the guide</b><small>Learn how TaskFlow works</small></span><span className="action-arrow">→</span></Link></div>
      </section>

      <section className="section-heading"><div><span className="eyebrow">STAY ORGANIZED</span><h2>Your groups</h2><p>Jump back into what you're working on.</p></div><Link className="text-link" to="/groups">All groups →</Link></section>
      <section className="group-preview-grid">{groups.slice(0, 4).map((group) => <Link to={`/groups/${group.id}`} className="mini-group-card" key={group.id}><span className="group-emoji">{group.icon || "📁"}</span><span className="mini-group-name">{group.name}</span><span className="mini-group-count">{group.tasks.length} tasks <span>→</span></span></Link>)}</section>
    </div>
  );
}

function StatCard({ icon, label, value, tone, hint }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}-tone`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-hint">{hint}</div></div>;
}
