
import React from "react";
import "../css/UpcomingCard.css";

function UpcomingCard({ name, dob, daysLeft, image }) {
    const dateBirth=new Date(dob);
  return (
    <div className="upcoming-card">
      <img src={image} alt={name} className="upcoming-img" />

      <h2 className="upcoming-name">{name}</h2>

      <p className="upcoming-info">
        🎂 DOB: <span>{dateBirth.getDate()+"/"+Number(dateBirth.getMonth()+1)}</span>
      </p>

      <p className="upcoming-days">⏳ {daysLeft}  left</p>
    </div>
  );
}

export default UpcomingCard;
