import React, { PropTypes } from 'react';
import './App.scss';
import Header from './Header';
import Footer from './Footer';

// component:
function App({ children }) {
  return (
    <div className="page">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
};

export default App;
