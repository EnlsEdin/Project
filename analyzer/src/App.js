import React, { useState } from "react";
import { Routes, Route} from 'react-router-dom';
import './App.css';

import AddEnemy from './pages/AddEnemy';
import EnemyList from './pages/EnemyList';
import AddSkill from './pages/AddSkill';

function App() {
  return (
    <div className="App">
      <h1>Analyzer</h1>
      <Routes>
        <Route exact path='/' element={<EnemyList/>}/>
        <Route exact path='/AddEnemy' element={<AddEnemy/>}/>
        <Route exact path='/AddSkill' element={<AddSkill/>}/>
      </Routes>
    </div>
  );
}

export default App;
