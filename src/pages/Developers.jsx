const developers = [
  { initials: "KS", name: "Kenji Sarmiento", role: "Project Member", color: "blue" },
  { initials: "CP", name: "Emmanuel Caparos", role: "Project Member", color: "purple" },
  { initials: "P", name: "Julius Pansoy", role: "Developer", color: "green" },
  { initials: "G", name: "John Harrod Gayas", role: "Project Member", color: "orange" },
];
export default function Developers() {
  return <div className="page-stack"><section className="page-intro"><div><span className="eyebrow">THE PEOPLE BEHIND TASKFLOW</span><h1>Meet the developers</h1><p>Built as a DCIT 26 React laboratory project.</p></div><div className="intro-icon">♙</div></section><section className="developer-grid">{developers.map((person) => <article className="developer-card" key={person.initials}><div className={`avatar ${person.color}`}>{person.initials}</div><h2>{person.name}</h2><p>{person.role}</p></article>)}</section><section className="panel about-project"><span className="eyebrow">ABOUT THE PROJECT</span><h2>TaskFlow To-Do List</h2><p>TaskFlow is a task management website built with React, Vite, Tailwind CSS, and React Router. It demonstrates reusable components, page navigation, task state management, and browser LocalStorage persistence.</p><div className="tech-pills"><span>React</span><span>Vite</span><span>Tailwind CSS</span><span>React Router</span><span>LocalStorage</span></div></section></div>;
}
