import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Notification from "../components/Notification";

import "../css/SignupPage.css";

function SignupPage() {
  const [registerInput, setRegisterInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [sectionInput, setSectionInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isShow, setIshow] = useState(false);
  const [popup, setPop] = useState("");
  const navigation = useNavigate();
  const [err, setErr] = useState({
    nameErr: "",
    regErr: "",
    emailErr: "",
    dateErr: "",
    genderErr: "",
    sectionErr: "",
    passwordErr: "",
  });

  // popup then go
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        navigation("/");
        setPop("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popup, navigation]);

  //handle sign

  async function handleSignup(e) {
    e.preventDefault();
    setErr({
      nameErr: "",
      regErr: "",
      emailErr: "",
      dateErr: "",
      genderErr: "",
      sectionErr: "",
      passwordErr: "",
    });

    if (nameInput === "") {
      setErr((pre) => ({ ...pre, nameErr: "Enter your name" }));
      return;
    } else if (registerInput === "") {
      setErr((pre) => ({ ...pre, regErr: "Enter register number" }));
      return;
    } else if (!String(registerInput).startsWith("810020")) {
      setErr((pre) => ({
        ...pre,
        regErr: "Register number must start with 810020",
      }));
      return;
    } else if (dateInput === "") {
      setErr((pre) => ({ ...pre, dateErr: "select date of birth" }));
      return;
    } else if (genderInput === "") {
      setErr((pre) => ({ ...pre, genderErr: "Select gender" }));
      return;
    } else if (sectionInput === "") {
      setErr((pre) => ({ ...pre, sectionErr: "Select section" }));
      return;
    } else if (emailInput === "") {
      setErr((pre) => ({ ...pre, emailErr: "Enter the email" }));
      return;
    } else if (passwordInput === "" || confirmPasswordInput === "") {
      setErr((pre) => ({
        ...pre,
        passwordErr: "Enter password and confirm password",
      }));
      return;
    }

    if (passwordInput.length < 6) {
      setErr((pre) => ({
        ...pre,
        passwordErr: "Password must be at least 6 characters",
      }));
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setErr((pre) => ({
        ...pre,
        passwordErr: "Password and confirm password not match",
      }));
      return;
    }
    const body = {
      name: nameInput,
      regNo: registerInput,
      dateOfBirth: dateInput,
      gender: genderInput,
      section: sectionInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
      email: emailInput,
    };
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const res = await fetch("https://aubit-server.onrender.com/signup", option);
    const data = await res.json();

    if (res.ok) {
      if (data?.message) {
        if (data.message.includes("Email")) {
          setErr((pre) => ({ ...pre, emailErr: data.message }));

          return;
        } else if (data.message.includes("Register")) {
          setErr((pre) => ({ ...pre, regErr: data.message }));

          return;
        }
        if (data.message.includes("Success")) {
          setPop(data.message);
          return;
        }
      }
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h1 className="signup-title">Signup Page</h1>

        <label className="signup-label">Name</label>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
            setErr((pre) => ({ ...pre, nameErr: "" }));
          }}
          placeholder="Name"
          className="signup-input"
        />
        {err.nameErr !== "" && <span className="error-msg">{err.nameErr}</span>}

        <label className="signup-label">Register Number</label>
        <input
          type="number"
          value={registerInput}
          onChange={(e) => {
            setRegisterInput(e.target.value);

            setErr((pre) => ({ ...pre, regErr: "" }));
          }}
          placeholder="College Register No"
          className="signup-input"
        />
        {err.regErr !== "" && <span className="error-msg">{err.regErr}</span>}
        <label className="signup-label">Email</label>
        <input
          type="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);

            setErr((pre) => ({ ...pre, emailErr: "" }));
          }}
          placeholder="Email"
          className="signup-input"
        />
        {err.emailErr !== "" && (
          <span className="error-msg">{err.emailErr}</span>
        )}

        <label className="signup-label">Date of Birth</label>
        <input
          type="date"
          min="2000-01-01"
          max="2005-12-31"
          value={dateInput}
          onChange={(e) => {
            setDateInput(e.target.value);
            setErr((pre) => ({ ...pre, dateErr: "" }));
          }}
          className="signup-input"
        />
        {err.dateErr !== "" && <span className="error-msg">{err.dateErr}</span>}
        <div className="radio-container">
          <div className="radio-box">
            <p className="radio-title">Select Gender</p>

            <label className="radio-item">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={genderInput === "male"}
                onChange={(e) => {
                  setGenderInput(e.target.value);

                  setErr((pre) => ({ ...pre, genderErr: "" }));
                }}
              />
              Male
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={genderInput === "female"}
                onChange={(e) => {
                  setGenderInput(e.target.value);

                  setErr((pre) => ({ ...pre, genderErr: "" }));
                }}
              />
              Female
            </label>
          </div>
          {err.genderErr !== "" && (
            <span className="error-msg">{err.genderErr}</span>
          )}

          <div className="radio-box">
            <p className="radio-title">Select Section</p>

            <label className="radio-item">
              <input
                type="radio"
                name="section"
                value="E1"
                checked={sectionInput === "E1"}
                onChange={(e) => {
                  setSectionInput(e.target.value);

                  setErr((pre) => ({ ...pre, sectionErr: "" }));
                }}
              />
              E1
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="section"
                value="E2"
                checked={sectionInput === "E2"}
                onChange={(e) => {
                  setSectionInput(e.target.value);

                  setErr((pre) => ({ ...pre, sectionErr: "" }));
                }}
              />
              E2
            </label>

            <label className="radio-item">
              <input
                type="radio"
                name="section"
                value="other"
                checked={sectionInput === "other"}
                onChange={(e) => {
                  setSectionInput(e.target.value);

                  setErr((pre) => ({ ...pre, sectionErr: "" }));
                }}
              />
              Other
            </label>
          </div>

          {err.sectionErr !== "" && (
            <span className="error-msg">{err.sectionErr}</span>
          )}
        </div>

        <label className="signup-label">Password</label>
        <span className="eye-icon-btn" onClick={() => setIshow((pre) => !pre)}>
          {isShow ? <FaRegEye /> : <IoEyeOff />}
        </span>
        <input
          type={isShow ? "text" : "password"}
          className="signup-input"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Password"
        />

        <label className="signup-label">Confirm Password</label>
        <input
          type={isShow ? "text" : "password"}
          className="signup-input"
          value={confirmPasswordInput}
          onChange={(e) => {
            setConfirmPasswordInput(e.target.value);

            setErr((pre) => ({ ...pre, passwordErr: "" }));
          }}
          placeholder="Confirm Password"
        />

        {err.passwordErr !== "" && (
          <span className="error-msg">{err.passwordErr}</span>
        )}
        <div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </div>
      </form>
      {popup !== "" && (
        <Notification message={popup} onClose={() => setPop("")} />
      )}
    </div>
  );
}

export default SignupPage;
