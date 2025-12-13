import React from "react";
import "../css/BirthdayCard.css";

function BirthdayCard({ name, image }) {
  return (
    <div className="birthday-card">
      <img src={image} className="birthday-img" alt="profile" />

      <h1 className="cake-emojy">🎂</h1>
      <h1 className="birthday-heading">HAPPY BIRTHDAY</h1>

      <p className="birthday-name">
        {name[0].toUpperCase() + name.slice(1).toLowerCase()}{" "}
      </p>
    </div>
  );
}

export default BirthdayCard;
