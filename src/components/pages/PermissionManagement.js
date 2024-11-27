import React, { useState } from "react";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState(["Read", "Write", "Execute"]);
  const [newPermission, setNewPermission] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [updatedPermission, setUpdatedPermission] = useState("");

  // Add a new permission
  const addPermission = () => {
    if (newPermission.trim() === "") {
      alert("Permission cannot be empty.");
      return;
    }
    if (permissions.includes(newPermission)) {
      alert("Permission already exists.");
      return;
    }
    setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
    setNewPermission("");
  };

  // Update an existing permission
  const updatePermission = () => {
    if (selectedPermission.trim() === "" || updatedPermission.trim() === "") {
      alert("Both fields are required.");
      return;
    }
    if (!permissions.includes(selectedPermission)) {
      alert("Permission not found.");
      return;
    }
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm === selectedPermission ? updatedPermission : perm
      )
    );
    setEditMode(false);
    setSelectedPermission("");
    setUpdatedPermission("");
  };

  // Delete a permission
  const deletePermission = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.filter((perm) => perm !== permission)
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Permission Manager</h1>

      {/* Add Permission Section */}
      <div style={styles.section}>
        <input
          type="text"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="Enter new permission"
          style={styles.input}
        />
        <button onClick={addPermission} style={styles.button}>
          Add Permission
        </button>
      </div>

      {/* Edit Permission Section */}
      <div style={styles.section}>
        {editMode ? (
          <div style={styles.editContainer}>
            <select
              value={selectedPermission}
              onChange={(e) => setSelectedPermission(e.target.value)}
              style={styles.select}
            >
              <option value="">Select permission to edit</option>
              {permissions.map((perm, index) => (
                <option key={index} value={perm}>
                  {perm}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={updatedPermission}
              onChange={(e) => setUpdatedPermission(e.target.value)}
              placeholder="Updated permission name"
              style={styles.input}
            />
            <button onClick={updatePermission} style={styles.button}>
              Save Changes
            </button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} style={styles.button}>
            Edit Permission
          </button>
        )}
      </div>

      {/* Permissions List */}
      <h2 style={styles.subtitle}>Existing Permissions</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Permission</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{permission}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => deletePermission(permission)}
                  style={{ ...styles.button, backgroundColor: "red" }}
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
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#343849",
    color: "white",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
  },
  editContainer: {
    display: "flex",
    gap: "10px",
    flexDirection: "column",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#343849",
    color: "white",
  },
  subtitle: {
    marginBottom: "10px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#0B051D",
    padding: "10px",
    color: "white",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#0B051D",
  },
};

export default PermissionManagement;
