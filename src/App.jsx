import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Developers from "./pages/Developers.jsx";
import Groups from "./pages/Groups.jsx";
import GroupDetails from "./pages/GroupDetails.jsx";
import Guide from "./pages/Guide.jsx";
import Home from "./pages/Home.jsx";

const defaultGroups = [
  {
    id: "school",
    name: "School",
    icon: "📚",
    tasks: [
      { id: 1, title: "Finish DCIT 26 activity", done: false },
      { id: 2, title: "Review class notes", done: true },
    ],
  },
  {
    id: "personal",
    name: "Personal",
    icon: "🌱",
    tasks: [{ id: 3, title: "Organize my schedule", done: false }],
  },
  { id: "projects", name: "Projects", icon: "💻", tasks: [] },
  { id: "daily", name: "Daily", icon: "☀️", tasks: [] },
];

function loadGroups() {
  try {
    const savedGroups = localStorage.getItem("taskflow-groups");
    if (savedGroups !== null) {
      const parsedGroups = JSON.parse(savedGroups);
      if (
        Array.isArray(parsedGroups) &&
        parsedGroups.every(
          (group) =>
            group &&
            typeof group.id === "string" &&
            typeof group.name === "string" &&
            Array.isArray(group.tasks)
        )
      ) {
        return parsedGroups;
      }
    }
  } catch (error) {
    console.error("Error loading groups:", error);
  }
  return defaultGroups;
}

export default function App() {
  const [groups, setGroups] = useState(loadGroups);

  useEffect(() => {
    try {
      localStorage.setItem("taskflow-groups", JSON.stringify(groups));
    } catch (error) {
      console.error("Error saving groups:", error);
    }
  }, [groups]);

  function addGroup(name) {
    const cleanName = name.trim();
    if (!cleanName) return false;
    if (groups.some((group) => group.name.toLowerCase() === cleanName.toLowerCase())) {
      return false;
    }
    const newGroup = {
      id: `group-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: cleanName,
      icon: "📁",
      tasks: [],
    };
    setGroups((currentGroups) => [...currentGroups, newGroup]);
    return true;
  }

  function addTask(groupId, title) {
    const cleanTitle = title.trim();
    if (!cleanTitle) return false;
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: cleanTitle,
      done: false,
    };
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId ? { ...group, tasks: [...group.tasks, newTask] } : group
      )
    );
    return true;
  }

  function toggleTask(groupId, taskId) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                String(task.id) === String(taskId) ? { ...task, done: !task.done } : task
              ),
            }
          : group
      )
    );
  }

  function deleteTask(groupId, taskId) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? { ...group, tasks: group.tasks.filter((task) => String(task.id) !== String(taskId)) }
          : group
      )
    );
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home groups={groups} />} />
          <Route path="/groups" element={<Groups groups={groups} addGroup={addGroup} />} />
          <Route
            path="/groups/:groupId"
            element={
              <GroupDetails
                groups={groups}
                addTask={addTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            }
          />
          <Route path="/guide" element={<Guide />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} TaskFlow <span>•</span> DCIT 26 Project</footer>
    </div>
  );
}
