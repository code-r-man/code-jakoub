import React, { PropTypes } from 'react';
import './App.scss';
import Header from './Header';
import Footer from './Footer';
import Form from 'SignUp/SignUpFormNew';

// component:
function App({ children }) {
  return (
    <div className="page">
      <Header />
      {children}
      <Form />
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
};

export default App;
