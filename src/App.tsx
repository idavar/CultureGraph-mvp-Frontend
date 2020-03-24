import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div>Content Here</div>
      <Footer />
    </div>
  );
}

export default App;
