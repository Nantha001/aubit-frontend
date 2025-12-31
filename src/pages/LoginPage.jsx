import React, { useState } from "react";
import "../css/LoginPage.css";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Notification from "../components/Notification";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);

  const [registerInput, setRegisterInput] = useState("");
  const [popup, setPopup] = useState("");
  const [err, setErr] = useState({ regErr: "", passwordErr: "" });
  const navigation = useNavigate();
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!popup) {
      return;
    }

    if (token) {
      setLoading(false)
      const time = setTimeout(() => {
        navigation("/home", { replace: true });
        setPopup("");
      }, 2000);

      return () => clearTimeout(time);
    }
  }, [popup]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && !popup) {
      setLoading(false)
      navigation("/home", { replace: true });
    }
  }, []);

  //login
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true)

    setErr({ regErr: "", passwordErr: "" });
    if (!registerInput) {
      setErr((pre) => ({ ...pre, regErr: "Enter the Register Number" }));
      setLoading(false)
      return;
    } else if (!password) {
      setErr((pre) => ({ ...pre, passwordErr: "Enter the Password" }));
      setLoading(false)
      return;
    }
    setLoading(true)
    const apiUrl = "https://aubit-backend-24ns.onrender.com/login";
    const body = { regNo: registerInput, password: password };
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const res = await fetch(apiUrl, option);
    const data = await res.json();
    if (res.ok) {
      if (data?.message) {
        if (data.message.includes("user")) {
          setErr((pre) => ({
            ...pre,
            regErr: data.message || "Invaild User ID",
          }));
          setLoading(false)
          return;
        } else if (data.message.includes("Password")) {
          setErr((pre) => ({
            ...pre,
            passwordErr: data.message || "Invaild password",
          }));
          setLoading(false)
          return;
        }
      }
      if (data.message.includes("successfully")) {
        const token = data.jwtToken;

        if (token) {
          localStorage.setItem("jwtToken", token);
          setPopup(data.message);
          setLoading(false)
        }
      }
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Login Page</h1>

        <label className="login-label">Enter College Register Number</label>
        <input
          type="number"
          value={registerInput}
          onChange={(e) => {
            setRegisterInput(e.target.value);
            setErr((pre) => ({ ...pre, regErr: "" }));
          }}
          placeholder="College Reg No 810020..."
          className="login-input"
        />
        {err.regErr !== "" && <span className="err-msg">{err.regErr}</span>}

        <label className="login-label">Enter Password</label>

        <div className="password-wrapper">
          <input
            type={isPassVisible ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr((pre) => ({ ...pre, passwordErr: "" }));
            }}
            className="login-input password-input"
            placeholder="Enter Password"
          />

          <span
            className="password-toggle"
            onClick={() => setIsPassVisible((prev) => !prev)}
          >
            {isPassVisible ? <FaRegEye /> : <IoEyeOff />}
          </span>
        </div>

        {err.passwordErr !== "" && (
          <span className="err-msg">{err.passwordErr}</span>
        )}

        <button type="submit" className="login-btn">
          {loading?"...Loading⌛":"Login"}
        </button>
      </form>
      {popup !== "" && (
        <Notification message={popup} onClose={() => setPopup("")} />
      )}
      <span className="signup-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </span>
    </div>
  );
}

export default LoginPage;
