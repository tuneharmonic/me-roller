import React, { useState } from 'react';
import './App.css';
import Weapon from './models/Weapon';
import WeaponType from './models/WeaponType';
import FireType from './models/FireType';
import WeaponInput from './components/WeaponInput';

function App() {
  const [weapon, setWeapon] = useState(new Weapon(
    'M8 Avenger',
    'Standard issue alliance military assault rifle. Has quickly become a widely adopted defense platform across the galaxy.',
    WeaponType.getValue('ARifle') || '',
    [4],
    0,
    0,
    20,
    2,
    4,
    FireType.getValue('Auto') || '',
    2));

  return (
    <div className="App">
      <WeaponInput weapon={weapon} onChange={setWeapon} />
    </div>
  );
}

export default App;
