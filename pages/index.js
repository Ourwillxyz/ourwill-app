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
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/kenya-flag.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2rem',
      }}
    >
      <img
        src="/ourwill-logo.png"
        alt="OurWill Logo"
        style={{
          width: '320px',
          maxWidth: '96vw',
          marginBottom: '2rem',
          display: 'block',
          filter: 'drop-shadow(0px 5px 22px rgba(0,0,0,0.23))',
        }}
      />
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
        }}
      >
        <form onSubmit={handleLogin}>
          <h2 style={{ textAlign: "center", marginBottom: 18, color: "#3b82f6" }}>
            Admin Login
          </h2>
          {err && <div style={{
            width: '100%',
            marginBottom: '1rem',
            color: '#ef4444',
            background: '#fee2e2',
            padding: '0.7rem',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '0.98rem',
          }}>{err}</div>}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              background: '#fff',
              color: '#000',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              marginBottom: 18,
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              background: '#fff',
              color: '#000',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              marginBottom: 18,
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem 0',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.05rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginTop: '0.2rem',
              marginBottom: 8,
            }}
          >
            Login
          </button>
        </form>
        <div style={{
          marginTop: '1.3rem',
          color: '#555',
          fontSize: '0.97em',
          lineHeight: 1.5,
          textAlign: 'center'
        }}>
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
