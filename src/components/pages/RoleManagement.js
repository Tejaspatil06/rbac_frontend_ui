import React, { useState } from "react";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    "Team Lead",
    "Manager",
    "Associate Manager",
  ]);
  const [newRole, setNewRole] = useState("");
  const [editRole, setEditRole] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Function to add a new role
  const handleAddRole = () => {
    if (!newRole) return alert("Role cannot be empty.");
    if (roles.includes(newRole)) return alert("Role already exists.");
    setRoles((prevRoles) => [...prevRoles, newRole]);
    setNewRole("");
  };

  // Function to update an existing role
  const handleEditRole = () => {
    if (!editRole || !updatedRole) return alert("Invalid role details.");
    if (!roles.includes(editRole)) return alert("Role not found.");
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role === editRole ? updatedRole : role))
    );
    setEditRole("");
    setUpdatedRole("");
    setIsEditing(false);
  };

  // Function to delete a role
  const handleDeleteRole = (roleToDelete) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role !== roleToDelete));
  };

  return (
    <div style={styles.container}>
      <h1>Role Manager</h1>

      {/* Add Role Section */}
      <div style={styles.section}>
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Add new role"
          style={styles.input}
        />
        <button onClick={handleAddRole} style={styles.button}>
          Add Role
        </button>
      </div>

      {/* Edit Role Section */}
      <div style={styles.section}>
        {isEditing ? (
          <div>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              style={styles.select}
            >
              <option value="">Select role to edit</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              placeholder="Updated role name"
              style={styles.input}
            />
            <button onClick={handleEditRole} style={styles.button}>
              Update Role
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} style={styles.button}>
            Edit Role
          </button>
        )}
      </div>

      {/* Existing Roles Section */}
      <h2>Existing Roles</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role}</td>
              <td>
                <button
                  onClick={() => handleDeleteRole(role)}
                  style={{ ...styles.button, ...styles.deleteButton }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#f5f5f5",
    backgroundColor: "#2c2f3a",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  section: {
    marginBottom: "20px",
  },
  input: {
    marginRight: "10px",
    height: "35px",
    background: "#343849",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "4px",
  },
  select: {
    marginRight: "10px",
    height: "35px",
    background: "#343849",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    backgroundColor: "white",
  },
};

export default RoleManagement;
