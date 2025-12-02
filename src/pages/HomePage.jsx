import { useState } from "react";
import BirthdayCard from "../components/BirthdayCard";
import Header from "../components/Header";
import "../css/HomePage.css";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import NoBirthdayCard from "../components/NoBirthdayCard";

function HomePage() {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [netErr, setNetErr] = useState("");
  const [refresh, setRefresh] = useState(false);

  function isTodayBrthday(dob) {
    const today = new Date();
    const birthDate = new Date(dob);

    return (
      today.getDate() === birthDate.getDate() &&
      birthDate.getMonth() === today.getMonth()
    );
  }

  //refresh
  function refreshFun() {
    setRefresh((e) => !e);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const apiUrl = "https://aubit-server.onrender.com/userdata";
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
          console.log(data.userData);
          setIsLoading(false);
          setData(data.data);
          //payload

          localStorage.setItem("payLoad", JSON.stringify(data?.payLoad));
          setNetErr("");

          return;
        } else {
          setPopup(res?.message || "Server Not Response");
          setNetErr("");

          return;
        }
      } catch (e) {
        setIsLoading(false);
        setNetErr("neterr");
      }
    }

    fetchData();
  }, [refresh]);

  return (
    <>
      <Header  setRefresh={refreshFun} />

      <div className="home-container">
        <marquee behavior="alternate" direction="left">
          <h1 className="today-birthday-heading">Today Birthday🎈</h1>
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
          data.filter((e) => isTodayBrthday(e.dob)).length === 0 && (
            <NoBirthdayCard />
          )}
        {!isLoading && (
          <div>
            {data
              .filter((e) => isTodayBrthday(e.dob))
              .map((e, i) => {
                const genderImg =
                  e.gender === "male"
                    ? "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396387/Boy_Default_Profile_ihjeyq.png"
                    : "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396388/Gril_Default_Profile_jounjn.png";

                const img =
                  e.profile_photo == "null" ? genderImg : e.profile_photo;

                return (
                  <div key={i}>
                    <BirthdayCard name={e.name} image={img} />;
                  </div>
                );
              })}
          </div>
        )}
        <Notification message={popup} onClose={() => setPopup("")} />
      </div>
    </>
  );
}

export default HomePage;
