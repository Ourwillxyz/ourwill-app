import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('/admin/users').then(res => setUsers(res.data));
  }, []);
  
  const deleteUser = (id) => {
    axios.delete(`/admin/users/${id}`).then(() => {
      setUsers(users.filter(user => user._id !== id));
    });
  };
  
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
