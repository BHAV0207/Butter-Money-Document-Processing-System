import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(userInfo.name, userInfo.email, userInfo.password);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
