import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from './Header.module.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Update the login status based on the session_id in local storage
    setIsLoggedIn(!!localStorage.getItem('session_id'));
  }, []);

  const handleLogout = () => {
    // Remove the session ID from local storage
    localStorage.removeItem('session_id');
    
    // Update the login status
    setIsLoggedIn(false);

    // Redirect to the home page or login page
    Router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          Krafty Kitchen
        </Link>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link href="#" onClick={handleLogout} className={styles.navLink}>Logout</Link>
            </li>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {/* Add other navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
