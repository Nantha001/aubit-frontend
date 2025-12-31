import React, { useState } from "react";
import Notification from "../components/Notification";
import "../css/Upload.css";
import Loader from "../components/Loader";

export default function Upload({ fun, setIsUpload }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [popup, setPopup] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleUpload() {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("https://aubit-backend-24ns.onrender.com/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: formData,
      });

      if (res.ok) {
        // setPopup("Upload Success");
        alert("Upload success 😎 ✔");
        setIsLoading(false);
        setIsUpload((e) => !e);
        fun();
      } else {
        setIsLoading(false);
        // setPopup("❌ Upload Failed Retry");
        alert("❌ Upload Failed Retry ");
      }
    } catch (error) {
      alert("Server Not Response 😴 TRY AGAIN");
    }
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

        <button disabled={!image} className="upload-btn" onClick={handleUpload}>
          <center style={isLoading == true ? { color: "red" } : {}}>
            {isLoading ? "Loading...." : "Upload"}
          </center>
        </button>

        {popup && <Notification message={popup} onClose={() => setPopup("")} />}
      </div>
    </>
  );
}
