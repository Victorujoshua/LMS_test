import React from 'react';
import Header from './Header';
import SubjectCard from './SubjectCard';
import Navigation from './Navigation';

// Placeholder data - this would eventually come from props or state management
const childNickname = "Explorer";
const pointsEarned = 1250;

const subjects = [
  { id: 1, name: "Math", icon: "🍎", progress: 60 },
  { id: 2, name: "Science", icon: "🪐", progress: 30 },
  { id: 3, name: "Reading", icon: "📚", progress: 75 },
];

const currentAdventure = {
  topicName: "Dinosaur Dig",
  thumbnail: "path/to/dino-thumbnail.png" // Placeholder
};

const MainDashboardView = () => {
  return (
    <div className="dashboard-view">
      <Header pointsEarned={pointsEarned} />

      <main className="main-content">
        <section className="welcome-message">
          <h2>Hi {childNickname}! 👋</h2> {/* Friendly character waving can be a CSS background or img */}
        </section>

        <section className="subject-selection-area">
          <h3>Choose Your Adventure!</h3>
          <div className="subject-cards-container">
            {subjects.map(subject => (
              <SubjectCard
                key={subject.id}
                name={subject.name}
                icon={subject.icon}
                progress={subject.progress}
              />
            ))}
          </div>
        </section>

        {currentAdventure && (
          <section className="continue-learning-section">
            <button className="large-button continue-adventure-button">
              {/* <img src={currentAdventure.thumbnail} alt={currentAdventure.topicName} className="adventure-thumbnail" /> */}
              Continue {currentAdventure.topicName}!
            </button>
          </section>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default MainDashboardView;
