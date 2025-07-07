import React from 'react';

// Placeholder icons
const HomeIcon = () => <span role="img" aria-label="Home">🏠</span>;
const ProgressIcon = () => <span role="img" aria-label="My Progress">🏆</span>;
const CreationsIcon = () => <span role="img" aria-label="My Creations">🎨</span>;
const ParentIcon = () => <span role="img" aria-label="Parent Area">👨‍👩‍👧‍👦</span>; // More complex interaction needed for "hold" or pattern

const Navigation = () => {
  // In a real app, these would likely use React Router's <Link> or <NavLink>
  // or dispatch actions to change views
  const handleNavClick = (itemName) => {
    console.log(`${itemName} clicked`);
    // Navigation logic here
  };

  return (
    <nav className="footer-navigation">
      <button onClick={() => handleNavClick('Home')} className="nav-button large-button" aria-label="Dashboard">
        <HomeIcon />
        <span>Home</span>
      </button>
      <button onClick={() => handleNavClick('Progress')} className="nav-button large-button" aria-label="My Progress">
        <ProgressIcon />
        <span>Progress</span>
      </button>
      <button onClick={() => handleNavClick('Creations')} className="nav-button large-button" aria-label="My Creations">
        <CreationsIcon />
        <span>Creations</span>
      </button>
      <button
        onClick={() => handleNavClick('ParentArea')}
        className="nav-button large-button parent-area-button"
        aria-label="Parent Area"
        // onMouseDown, onMouseUp, onTouchStart, onTouchEnd could be used for "hold" detection
        // This requires more complex state management and event handling
      >
        <ParentIcon />
        {/* Text might be hidden or very small for this button if it's meant to be subtle */}
        {/* <span>Parent</span> */}
      </button>
    </nav>
  );
};

export default Navigation;
