import "../css/NoBirthdayCard.css";
import { Link } from "react-router-dom";


function NoBirthdayCard() {
  return (
    <div className="no-bday-wrapper">
      <div className="no-bday-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="no birthday"
          className="no-bday-icon"
        />

        <h2 className="no-bday-title">No Birthdays Today</h2>
        <p className="no-bday-text">Check out the upcoming birthdays below!</p>
        <Link to="/upcoming">
        <button style={{color:"yellow",background:"black"}}>Upcoming Birthday</button>
        </Link>
      </div>
    </div>
  );
}

export default NoBirthdayCard;
