import "../css/NoBirthdayCard.css";
import { Link } from "react-router-dom";


function NoBirthdayCard() {
  return (
    <div className="no-bday-wrapper">
      <div className="no-bday-card">
        <img
          src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1771456505/file_00000000b0847206bbe2436c5a491dc_yeswt3.jpg"
          alt="no birthday"
          className="no-bday-icon"
        />

    
        <Link to="/upcoming">
        <button style={{color:"yellow",background:"black"}}>Upcoming Birthday Page</button>
        </Link>
      </div>
    </div>
  );
}

export default NoBirthdayCard;
