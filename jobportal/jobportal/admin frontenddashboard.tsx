import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 





function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: token };

      try {
        const resUsers = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, { headers });
        const resJobs = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/jobs`, { headers });

        setUsers(resUsers.data);
        setJobs(resJobs.data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Users */}
      <h3>Users</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.email} ({u.role})</li>
        ))}
      </ul>

      {/* Jobs */}
      <h3>Jobs</h3>
      <ul>
        {jobs.map(j => (
          <li key={j._id}>{j.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;

