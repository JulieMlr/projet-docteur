import React from 'react';
import logo from './logo.svg';
import './App.css';
import {  useEffect } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from './firebase';
import Creation from './components/Creation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connexion from './components/Connexion';
import Calendrier from './components/Calendrier';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/creation' element={<Creation />} />
          <Route path='/' element={<Connexion />} />
          <Route path='/calendrier/:idDocteur' element={<Calendrier />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
