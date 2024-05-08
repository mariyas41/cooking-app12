import React from 'react';
import styles from './Footer.module.css'; // Make sure to create this CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Krafty Kitchen</p>
      {/* Add any additional information or links */}
    </footer>
  );
};

export default Footer;
