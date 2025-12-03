import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Header.css";
import Upload from "../upload/Upload";

function Header({ setRefresh }) {
  const navigation = useNavigate();
  const [response, setResponse] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const api = "https://aubit-backend.onrender.com/userdata";
      const option = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      };
      const res = await fetch(api, option);
      const data = await res.json();
      if (res.ok) {
        const payLoad = JSON.parse(localStorage.getItem("payLoad"));
        const regNo = payLoad?.regNo;
        const user = data.data.find((e) => e.reg_number == regNo);

        setResponse(user);
      }
    }
    fetchData();
  }, [setRefresh]);

  const DefaultImg =
    response?.gender === "male"
      ? "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396387/Boy_Default_Profile_ihjeyq.png"
      : "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396388/Gril_Default_Profile_jounjn.png";

  return (
    <>
      <header className="header-container">
        <nav className="header-nav">
          <div></div>

          <ul className="nav-links">
            <li>
              <Link to="/home" className="nav-link">
                Birthday 🎈
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="nav-link">
                Upcoming 🎂
              </Link>
            </li>
            <li>
              <Link to="/member" className="nav-link">
                Reg member
              </Link>
            </li>
            <li
              className="logout-text"
              onClick={() => {
                setIsLogout(true);
              }}
            >
              Logout
            </li>
            <li>
              {response !== "" && (
                <img
                  className="header-profile"
                  onClick={() => setProfileView((e) => !e)}
                  src={
                    response?.profile_photo == "null"
                      ? DefaultImg
                      : response?.profile_photo
                  }
                  alt="profile-image"
                />
              )}
              {response == "" && (
                <div
                  style={{ background: "#131a26" }}
                  className="header-profile"
                  onClick={() => {
                    setProfileView((e) => !e);
                  }}
                ></div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {response && (
        <div style={{ background: "#131a26" }}>
          <center>
            <span className="welcome-title">
              <span style={{ color: "white" }}>Welcome</span> {response?.name} ❤
            </span>
          </center>
        </div>
      )}

      {isLogout && (
        <div className="logout-popup" style={{ background: "#131a26" }}>
          <div>
            <p style={{ color: "white" }}>Are you sure Logout?</p>
            <button
              onClick={() => {
                localStorage.clear();

                navigation("/", { replace: true });
                setIsLogout(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setIsLogout(false)}>No</button>
          </div>
        </div>
      )}

      {isUpload && (
        <div
          className="profile-edit-container"
          style={{ background: "#131a26" }}
        >
          <div>
            <button
              style={{ color: "red", background: "black" }}
              onClick={() => setIsUpload((e) => !e)}
            >
              close{" "}
            </button>
            <Upload fun={setRefresh} />
          </div>
        </div>
      )}

      {profileView &&
        (response === "" ? (
          <div className="profile-view-container">
            <div
              style={{ background: "#131a26" }}
              className="header-profile"
            ></div>
          </div>
        ) : (
          <div className="profile-view-container">
            <div className="profile-view-card">
              <button onClick={()=>(setProfileView(e=>!e))} style={{color:"red"}}>X</button>
              <img
                className="profile-view"
                src={
                  response?.profile_photo === "null"
                    ? DefaultImg
                    : response?.profile_photo
                }
                alt="profile-img"
              />
            
              <button
                onClick={() => {
                  setIsUpload(true);
                  setProfileView(false);
                }}
              >
                Upload
              </button>
            </div>
          </div>
        ))}
    </>
  );
}

export default Header;
