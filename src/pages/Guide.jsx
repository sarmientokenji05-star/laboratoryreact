const steps = [
  { number: "01", title: "Open your groups", description: "Visit Groups to see the default groups or create a new one for a subject, project, or personal goal." },
  { number: "02", title: "Add tasks", description: "Open a group, type a task into the input field, and select Add task." },
  { number: "03", title: "Track your progress", description: "Tick the checkbox when a task is finished. Your dashboard and group progress update automatically." },
  { number: "04", title: "Keep things tidy", description: "Use All, Pending, and Done filters to find tasks. Delete a task when you no longer need it." },
];
export default function Guide() {
  return <div className="page-stack"><section className="page-intro"><div><span className="eyebrow">QUICK START</span><h1>How to use TaskFlow</h1><p>A simple guide to help you plan, organize, and finish your tasks.</p></div><div className="intro-icon">ⓘ</div></section><div className="guide-grid">{steps.map((step) => <article className="guide-card" key={step.number}><span className="guide-number">{step.number}</span><h2>{step.title}</h2><p>{step.description}</p></article>)}</div><section className="tip-banner"><span>✦</span><div><h2>One task at a time</h2><p>Keep task names clear and manageable. Consistent small steps can make a busy day feel easier.</p></div></section></div>;
}
