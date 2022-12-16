import React from 'react';
import './App.css';
import Creation from './components/Creation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connexion from './components/Connexion';
import Calendrier from './components/Calendrier';
import { Button} from '@chakra-ui/react'

function App() {
  let deferredPrompt;
  const installApp = document.getElementById('installApp');

  if (installApp) {
    installApp.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          deferredPrompt = null;
        }
      }
    })
  }

  return (
    <div className="App">
      <Button id="installApp" colorScheme='facebook' size='sm'>Installer</Button>
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
