import React, { useState } from 'react';
import './App.css';
import Weapon from './models/Weapon';
import WeaponInput from './components/WeaponInput';
import DiceExpression from './models/DiceExpression';

function App() {
  const [weapon, setWeapon] = useState(new Weapon(
    'M8 Avenger',
    'Standard issue alliance military assault rifle. Has quickly become a widely adopted defense platform across the galaxy.',
    'ARifle',
    new DiceExpression('d4'),
    0,
    20,
    2,
    4,
    'Auto',
    2));

  return (
    <div className="App">
      <WeaponInput weapon={weapon} onChange={setWeapon} />
    </div>
  );
}

export default App;
