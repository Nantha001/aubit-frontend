import React, { useState } from "react";
import Notification from "../components/Notification";
import "../css/Upload.css";
import Loader from "../components/Loader";

export default function Upload({ fun }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [popup, setPopup] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleUpload() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    fetch("https://aubit-server.onrender.com/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then(() => {
        setPopup("Uploaded ✔");
        fun();
        setIsLoading(false);
      })
      .catch(() => {
        setPopup("Upload failed ❌");
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="upload-container">
        <span style={{ color: "white" }}>Profile Upload</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="upload-input"
        />

        {preview && (
          <img src={preview} alt="preview" className="upload-preview" />
        )}

        <button className="upload-btn" onClick={handleUpload}>
          <center style={isLoading == true ? { color: "red" } : {}}>
            {isLoading ? "Loading...." : "Upload"}
          </center>
        </button>

        {popup && <Notification message={popup} onClose={() => setPopup("")} />}
      </div>
    </>
  );
}
