import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "50px",
        backgroundColor: "#000000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #333",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Login
        </h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            placeholder="Email or phone number"
            style={{
              padding: "15px",
              borderRadius: "4px",
              border: "none",
              background: "#333",
              color: "white",
              fontSize: "1rem",
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              padding: "15px",
              borderRadius: "4px",
              border: "none",
              background: "#333",
              color: "white",
              fontSize: "1rem",
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "15px",
              backgroundColor: "#e50914",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "25px", color: "#737373", fontSize: "1rem" }}>
          New to MovieFlix?{" "}
          <Link
            to="/Signup"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up now
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Login;