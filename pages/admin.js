import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const groups = [
  "candidate",
  "agent",
  "returning officer",
  "observer"
];

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    fetch("/api/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) setUsers(data.users);
      else {
        setErr(data.error || "Not authorized");
        setTimeout(() => router.push("/"), 1200);
      }
    });
  }, []);

  function handleDelete(id) {
    const token = localStorage.getItem("token");
    fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) setUsers(users => users.filter(u => u.id !== id));
      else setErr(data.error || "Delete failed");
    });
  }

  // Handle group change
  function handleGroupChange(id, newGroup) {
    const token = localStorage.getItem("token");
    fetch(`/api/users/${id}/group`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ group: newGroup }),
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        setUsers(users =>
          users.map(u =>
            u.id === id ? { ...u, group: newGroup } : u
          )
        );
      } else {
        setErr(data.error || "Group update failed");
      }
    });
  }

  return (
    <div className="admin-bg">
      <div className="admin-logo-container">
        <img src="/ourwill-logo.png" alt="OurWill Logo" className="admin-logo" />
      </div>
      <div className="admin-center-container">
        <div className="admin-glass-card">
          <h2 className="admin-title">Admin Dashboard</h2>
          {err && <p className="admin-error">{err}</p>}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>
                      <span className={u.isAdmin ? "badge-admin" : "badge-user"}>
                        {u.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td>
                      {u.isAdmin ? (
                        <span className="badge-group" style={{background:"#e0e7ef", color:"#888"}}>—</span>
                      ) : (
                        <span>
                          <select
                            value={u.group || ""}
                            onChange={e => handleGroupChange(u.id, e.target.value)}
                            style={{
                              borderRadius: "6px",
                              padding: "0.2em 0.5em",
                              fontSize: "1em",
                              background: "#fff",
                              color: "#1d4ed8",
                              border: "1px solid #60a5fa"
                            }}
                          >
                            <option value="">Select group</option>
                            {groups.map(g => (
                              <option value={g} key={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                            ))}
                          </select>
                          {u.group &&
                            <span className="badge-group" style={{
                              marginLeft: 8,
                              background: "#f3f4f6",
                              color: "#2563eb",
                              border: "1px solid #60a5fa",
                              borderRadius: "12px",
                              padding: "2px 12px",
                              fontWeight: 600,
                              fontSize: "0.96em"
                            }}>
                              {u.group}
                            </span>
                          }
                        </span>
                      )}
                    </td>
                    <td>
                      {u.isAdmin ? (
                        <span className="admin-dash">—</span>
                      ) : (
                        <button className="admin-delete-btn" onClick={() => handleDelete(u.id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="admin-logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
