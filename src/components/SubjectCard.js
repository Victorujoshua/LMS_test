import React from 'react';

const SubjectCard = ({ name, icon, progress }) => {
  // Styling for the progress bar will be handled in CSS
  // The icon is expected to be an emoji or a placeholder string for now
  return (
    <button className="subject-card large-button">
      <div className="subject-card-icon">{icon}</div>
      <div className="subject-card-name">{name}</div>
      {progress !== undefined && (
        <div className="subject-card-progress-bar-container">
          <div
            className="subject-card-progress-bar-filled"
            style={{ width: `${progress}%` }}
            aria-label={`${progress}% complete`}
          ></div>
        </div>
      )}
    </button>
  );
};

export default SubjectCard;
