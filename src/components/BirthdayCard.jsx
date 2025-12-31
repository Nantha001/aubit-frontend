import React from "react";
import "../css/BirthdayCard.css";
const wishes = [
  "Happy Birthday! 🎉 Wishing you a joyful year ahead.",
  "Happy Birthday 🎂 May all your dreams come true.",
  "Warm birthday wishes! Have a great day 🎈",
  "Happy Birthday! Stay happy and successful ✨",
  "Best wishes on your birthday 🎁 Enjoy your special day!",
];

function BirthdayCard({ name, image }) {
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  return (
    <div className="birthday-card">
      <img src={image} className="birthday-img" alt="profile" />

      <h1 className="birthday-heading">HAPPY BIRTHDAY 🎂</h1>

      <p className="birthday-name">
        {name[0].toUpperCase() + name.slice(1).toLowerCase()}{" "}
      </p>
      <p style={{ fontStyle: "italic", color: "blue" }}>{randomWish}</p>
    </div>
  );
}

export default BirthdayCard;
