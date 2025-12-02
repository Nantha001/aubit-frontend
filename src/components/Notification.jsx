import React, { useEffect } from "react";
import "../css/Notification.css";

function Notification({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="notification-popup">
      <span>{message}</span>
      <button className="notification-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Notification;
