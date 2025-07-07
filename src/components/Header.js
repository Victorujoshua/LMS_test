import React from 'react';

// Placeholder icons - in a real app, these would be SVGs, icon font, or image files
const Logo = () => <span className="logo">LMS</span>; // Placeholder for LMS logo/character
const SoundOnIcon = () => <span role="img" aria-label="Sound On">🔊</span>;
const SoundOffIcon = () => <span role="img" aria-label="Sound Off">🔇</span>;
const SettingsIcon = () => <span role="img" aria-label="Settings">⚙️</span>;
const StarIcon = () => <span role="img" aria-label="Star">⭐</span>;


const Header = ({ pointsEarned }) => {
  const [soundOn, setSoundOn] = React.useState(true);

  const toggleSound = () => {
    setSoundOn(!soundOn);
    // Add actual sound toggle logic here
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Logo />
      </div>
      <div className="header-right">
        <button onClick={toggleSound} className="icon-button" aria-label="Toggle Sound">
          {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
        </button>
        <button className="icon-button" aria-label="Settings">
          <SettingsIcon />
        </button>
        {pointsEarned !== undefined && (
          <div className="points-display">
            <StarIcon />
            <span>{pointsEarned}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
