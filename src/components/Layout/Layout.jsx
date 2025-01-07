import React from 'react';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';
import MainContent from '../MainContent/MainContent';

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar/>
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;
