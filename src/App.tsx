import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CultureCalendar from './components/calendar/CultureCalendar';
const phq = require('predicthq');
const client = new phq.Client({access_token: 'Acc3sS-t0keN'});
console.log('client', client);

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body_sec"> 
        <section id="Content"> 
          <CultureCalendar /> 
        </section> 
      </div>
      <Footer />
    </div>
  );
}

export default App;
