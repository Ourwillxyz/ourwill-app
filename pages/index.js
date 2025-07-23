import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      router.push("/admin");
    } else {
      setErr(data.error || "Login failed");
    }
  }

  return (
    <div className="main-center-container">
      <img src="/ourwill-logo.png" alt="OurWill Logo" className="logo" />
      <div className="glass-card">
        <form onSubmit={handleLogin}>
          <h2 style={{ textAlign: "center", marginBottom: 18, color: "#3b82f6" }}>
            Admin Login
          </h2>
          {err && <div className="alert-error">{err}</div>}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="input-lg"
            style={{ marginBottom: 18 }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="input-lg"
            style={{ marginBottom: 18 }}
          />
          <button type="submit" className="button-lg">
            Login
          </button>
        </form>
        <div className="note">
          <div style={{ color: "#888", marginTop: 10 }}>Demo accounts:</div>
          <div>
            <strong>Admin:</strong> <span style={{ color: "#3b82f6" }}>admin / admin123</span>
          </div>
          <div>
            <strong>User:</strong> <span style={{ color: "#3b82f6" }}>user / user123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
