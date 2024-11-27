import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard.js";
import UserManagement from "./components/pages/UserManagement.js";
import RoleManagement from "./components/pages/RoleManagement.js";
import PermissionManagement from "./components/pages/PermissionManagement.js";



function App() {
  const [users, setUsers] = useState([]);

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Role Based Acces Controller</h1>
          </div>
          <nav className="nav-menu">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
              User Manager
            </NavLink>
            <NavLink to="/roles" className={({ isActive }) => (isActive ? "active" : "")}>
              Role Manager
            </NavLink>
            <NavLink to="/permissions" className={({ isActive }) => (isActive ? "active" : "")}>
              Permission Manager
            </NavLink>
          </nav>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard users={users} />} />
            <Route
              path="/users"
              element={<UserManagement users={users} setUsers={setUsers} />}
            />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
