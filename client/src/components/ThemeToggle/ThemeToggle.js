import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.className = savedTheme;
    }
  }, []);

  const handleToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle-checkbox"
        checked={isDark}
        onChange={handleToggle}
      />
      <label htmlFor="theme-toggle-checkbox" className="theme-toggle-label">
        <span className="theme-toggle-inner" />
        <span className="theme-toggle-switch" />
      </label>
    </div>
  );
};

export default ThemeToggle;