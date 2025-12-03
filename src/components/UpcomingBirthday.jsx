import Header from "./Header";
import "../css/UpcomingBirthday.css";
import React, { useEffect, useState } from "react";
import UpcomingCard from "./UpcomingCard";
import Loader from "./Loader";
import NoUpcomingCard from "./NoUpcomingCard";
import Notification from "./Notification";

export default function UpcomingBirthday() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [netErr, setNetErr] = useState("");
  const [popup, setPopup] = useState("");
    const [refresh, setRefresh] = useState(false);
  //calculation upcoming

  function upCommmingBirthday(dob) {
    const today = new Date();
    const birthDate = new Date(dob);

    return (
      birthDate.getMonth() === today.getMonth() &&
      birthDate.getDate() !== today.getDate()
    );
  }

    //refresh
  function refreshFun() {
    setRefresh((e) => !e);
  }

  function daysLeftThisMonth(dob) {
    const today = new Date();
    const birth = new Date(dob);

    if (birth.getMonth() !== today.getMonth()) {
      return null;
    }

    const todayDate = today.getDate();
    const birthDate = birth.getDate();

    if (birthDate < todayDate) {
      return null;
    }

    return birthDate - todayDate;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const apiUrl = "https://aubit-backend.onrender.com/userdata";
        const option = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        };

        const res = await fetch(apiUrl, option);
        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          setData(data.data);
          setNetErr("");
          return;
        } else {
          setPopup(res?.message || "Server Not Response");
          setNetErr("");

          return;
        }
      } catch (err) {
        setNetErr("neterr");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [refresh]);

  return (
    <>
    <Header  setRefresh={refreshFun} />
      <div style={{ background: "#131A26", minHeight: "100vh" }}>
        <marquee behavior="alternate" direction="left">
          <h1 style={{ color: "red" }}>Upcoming Birthday🎈</h1>
        </marquee>
        {isLoading && <Loader color="blue" />}
        {netErr === "neterr" && (
          <div>
            <center>
              <h1 style={{ color: "red" }}>Connection Lost....🔌</h1>
            </center>
          </div>
        )}
        {!isLoading &&
          data.filter(
            (e) =>
              upCommmingBirthday(e.dob) && daysLeftThisMonth(e.dob) !== null
          ).length === 0 && <NoUpcomingCard />}
        {!isLoading && (
          <div className="birthday-list">
            {data
              .filter(
                (e) =>
                  upCommmingBirthday(e.dob) && daysLeftThisMonth(e.dob) !== null
              )
              .map((e, i) => {
                const genderImg =
                  e.gender === "male"
                    ? "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396387/Boy_Default_Profile_ihjeyq.png"
                    : "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396388/Gril_Default_Profile_jounjn.png";
                const img =
                  e.profile_photo == "null" ? genderImg : e.profile_photo;
                return (
                  <>
                    <div key={i}>
                      <UpcomingCard
                        name={e.name}
                        dob={e.dob}
                        daysLeft={daysLeftThisMonth(e.dob) + " Days"}
                        image={img}
                      />
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </div>
      <Notification message={popup} onClose={() => setPopup("")} />
    </>
  );
}
