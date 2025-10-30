import React from 'react';
import Header from '../Header';
import AboutT from '../AboutT';
import Footer from '../Footer';
import FAQ from '../FAQ';
import Hero from '../Hero';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <div className="flex-grow">
        <Hero />
        <AboutT />
        <FAQ />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
