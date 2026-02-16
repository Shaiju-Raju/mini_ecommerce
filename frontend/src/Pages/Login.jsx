import { useState } from "react";
import "./Login.css"
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3000/api/users/login",{
            email: email,
            password: password
         });

        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/");

    } catch (err) {
        alert("Invalid credential");
        console.log("Error in login",err);
    }
  };

  return (
    <>
    <Navbar />
    <div className="login-container">  
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
   </> 
  );
}
