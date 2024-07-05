import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setRole(response.data.role);
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      {!role && (
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
      {role === "admin" && <AdminDashboard />}
      {role === "user" && <UserDashboard />}
      {role === "guest" && <GuestDashboard />}
    </div>
  );
};

const AdminDashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, Admin!</p>
  </div>
);

const UserDashboard = () => (
  <div>
    <h1>User Dashboard</h1>
    <p>Welcome, User!</p>
  </div>
);

const GuestDashboard = () => (
  <div>
    <h1>Guest Dashboard</h1>
    <p>Welcome, Guest!</p>
  </div>
);

export default App;
