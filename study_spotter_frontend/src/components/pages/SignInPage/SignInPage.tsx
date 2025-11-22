import "./SignInPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignInPageProps {
  setSignedIn: (val: boolean) => void;
}

function SignInPage({ setSignedIn }: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "example@example.com" && password === "1234") {
      setSignedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}

export default SignInPage;
