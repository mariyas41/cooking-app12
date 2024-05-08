import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const mainContentStyle = {
    margin: '20px' // Adjust as needed
  };

  return (
    <>
      <Header />
      <div style={mainContentStyle}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
