import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ClientInfo } from './types/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './components/Register';
import { PublicID } from './components/PublicID';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/public_key' element={<PublicID />} />
      </Routes>
    </Router>
  )
}

export default App;