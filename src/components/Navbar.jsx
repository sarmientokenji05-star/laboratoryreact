import { NavLink } from "react-router-dom";

const links = [
  { to: "/home", label: "Home", icon: "⌂" },
  { to: "/groups", label: "Groups", icon: "▦" },
  { to: "/guide", label: "Guide", icon: "ⓘ" },
  { to: "/developers", label: "Developers", icon: "♙" },
];

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/home" className="brand" aria-label="TaskFlow Home">
          <span className="brand-mark">✓</span>
          <span>Task<span className="brand-accent">Flow</span><small>PLAN • DO • DONE</small></span>
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              <span className="nav-icon">{link.icon}</span>{link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
