import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      await axios.post(`${API_URL}/api/users/register`, {
        name: name,
        email: email,
        password: password
      });

      alert("Account created successfully");
      navigate("/login");

    } catch (err) {
      console.log("Signup error", err);
      alert("Signup failed");
    }
  };

  return (
    <div className="login-container">

      <h2 className="login-title">Signup</h2>

      <form className="login-form" onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>

      </form>

      <p style={{marginTop:"10px"}}>
        Already have an account? 
        <span
          style={{color:"blue", cursor:"pointer"}}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>

    </div>
  );
}