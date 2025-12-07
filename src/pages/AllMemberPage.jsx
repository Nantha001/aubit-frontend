import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import "../css/AllMemberPage.css";
import Header from "../components/Header";

function AllMemberPage() {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [neterr, setNetErr] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
        } else {
          setIsLoading(false);
          setPopup("Server Not Response ❌");
          setNetErr("");
        }
      } catch (e) {
        setNetErr("neterr");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [refresh]);

  //refresh
  function refreshFun() {
    setRefresh((e) => !e);
  }

  //search
  const dataFilterSearch = data.filter(
    (e) =>
      e.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) ||
      e.reg_number.toLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  return (
    <>
      <Header setRefresh={refreshFun} />
      <div className="page-bg">
        {neterr === "neterr" && (
          <div>
            <center>
              <h1 style={{ color: "red" }}>Connection Lost....🔌</h1>
            </center>
          </div>
        )}

        {!isLoading && (
          <center>
            <input
              type="text"
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="search reg no or name"
            />
          </center>
        )}

        {!isLoading && dataFilterSearch.length === 0 && (
          <center>
            <p style={{color:"white"}}>No Data Found</p>
          </center>
        )}

        {!isLoading && (
          <div className="member-container">
            {dataFilterSearch.map((e, i) => {
              const defaultPhoto =
                e.gender === "male"
                  ? "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396387/Boy_Default_Profile_ihjeyq.png"
                  : "https://res.cloudinary.com/dvkq1wvmz/image/upload/v1764396388/Gril_Default_Profile_jounjn.png";

              return (
                <div key={i} className="member-card">
                  <img
                    className="member-img"
                    src={
                      e.profile_photo === "null"
                        ? defaultPhoto
                        : e.profile_photo
                    }
                    alt="profile"
                  />

                  <h3 className="member-name">{e.name}</h3>
                  <p className="member-reg">Reg No: {e.reg_number}</p>
                </div>
              );
            })}

            <Notification message={popup} onClose={() => setPopup("")} />
          </div>
        )}

        {isLoading && <Loader color="blue" />}
      </div>
    </>
  );
}

export default AllMemberPage;
