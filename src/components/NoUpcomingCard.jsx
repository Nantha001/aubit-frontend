
import "../css/NoUpcomingCard.css";
import React from 'react'

function NoUpcomingCard() {
  return (
  <div className="no-up-wrapper">
      <div className="no-up-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1827/1827415.png"
          alt="no upcoming"
          className="no-up-icon"
        />

        <h2 className="no-up-title">No Upcoming Birthdays</h2>
        <p className="no-up-text">This Month</p>
      </div>
    </div>
  )
}

export default NoUpcomingCard