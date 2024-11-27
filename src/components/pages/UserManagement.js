import React, { useState } from "react";

const UserManagement = ({ users, setUsers }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [status, setStatus] = useState("active");
  const [activeModal, setActiveModal] = useState(null); // Tracks active modal
  const [errorMessage, setErrorMessage] = useState("");

  const availablePermissions = ["Read", "Write", "Delete", "Update"]; // Example permissions

  // Add a new user
  const addUser = () => {
    if (username && email) {
      const newUser = { username, email, role, permissions, status };
      setUsers([...users, newUser]);
      closeModal();
    }
  };

  // Edit existing user
  const editUser = () => {
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], email, role, permissions, status };
      setUsers(updatedUsers);
      closeModal();
    } else {
      setErrorMessage("User does not exist!");
    }
  };

  // Delete user
  const deleteUser = () => {
    const updatedUsers = users.filter((user) => user.username !== username);

    if (updatedUsers.length === users.length) {
      setErrorMessage("User does not exist!");
    } else {
      setUsers(updatedUsers);
      closeModal();
    }
  };

  // Toggle permission selection
  const handlePermissionChange = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  };

  // Close modal and reset state
  const closeModal = () => {
    setActiveModal(null);
    setUsername("");
    setEmail("");
    setRole("");
    setPermissions([]);
    setStatus("active");
    setErrorMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Manager</h1>
      <p>Manage users, their roles, and permissions.</p>

      {/* Action buttons */}
      <div className="button-group">
        <button onClick={() => setActiveModal("add")}>Add User</button>
        <button onClick={() => setActiveModal("edit")}>Edit User</button>
        <button onClick={() => setActiveModal("delete")}>Delete User</button>
      </div>

      {/* Add User Modal */}
      {activeModal === "add" && (
        <div className="modal">
          <h3>Add New User</h3>
          <UserForm
            username={username}
            email={email}
            role={role}
            permissions={permissions}
            status={status}
            setUsername={setUsername}
            setEmail={setEmail}
            setRole={setRole}
            setPermissions={setPermissions}
            setStatus={setStatus}
            availablePermissions={availablePermissions}
          />
          <ModalActions onSave={addUser} onCancel={closeModal} />
        </div>
      )}

      {/* Edit User Modal */}
      {activeModal === "edit" && (
        <div className="modal">
          <h3>Edit User</h3>
          <UserForm
            username={username}
            email={email}
            role={role}
            permissions={permissions}
            status={status}
            setUsername={setUsername}
            setEmail={setEmail}
            setRole={setRole}
            setPermissions={setPermissions}
            setStatus={setStatus}
            availablePermissions={availablePermissions}
          />
          <ModalActions onSave={editUser} onCancel={closeModal} />
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      )}

      {/* Delete User Modal */}
      {activeModal === "delete" && (
        <div className="modal">
          <h3>Delete User</h3>
          <div>
            <label>User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter user name"
            />
          </div>
          <ModalActions onSave={deleteUser} onCancel={closeModal} />
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      )}
    </div>
  );
};

// User Form Component
const UserForm = ({
  username,
  email,
  role,
  permissions,
  status,
  setUsername,
  setEmail,
  setRole,
  setPermissions,
  setStatus,
  availablePermissions,
}) => (
  <>
    <div>
      <label>User Name</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter user name"
      />
    </div>
    <div>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
    </div>
    <div>
      <label>Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="Team Lead">Team Lead</option>
        <option value="manager">Manager</option>
        <option value="Associate Manager">Associate Manager</option>
      </select>
    </div>
    <div style={{ display: "flex", justifyContent: "start" }}>
      <label>Permissions</label>
      {availablePermissions.map((permission, index) => (
        <div
          style={{ display: "flex", alignItems: "center", width: "80px" }}
          key={index}
        >
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            id={permission}
            checked={permissions.includes(permission)}
            onChange={() => setPermissions((prev) =>
              prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
            )}
          />
          <label>{permission}</label>
        </div>
      ))}
    </div>
    <div>
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  </>
);

// Modal Action Buttons
const ModalActions = ({ onSave, onCancel }) => (
  <div>
    <button onClick={onSave}>Save</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message }) => <p className="error">{message}</p>;

export default UserManagement;
