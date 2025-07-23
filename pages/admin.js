import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Admin Dashboard</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <table border="1" cellPadding={8} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.isAdmin ? "Admin" : "User"}</td>
              <td>
                {u.isAdmin ? "—" : (
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => {
        localStorage.removeItem("token");
        router.push("/");
      }}>Logout</button>
    </div>
  );
}
