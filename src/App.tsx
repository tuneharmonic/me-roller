import React, { useState } from 'react';
import NumberInput from './components/NumberInput';
import './App.css';

function App() {
  const [values, setValues] = useState({
    health: 10,
    damage: 5
  });

  function setHealth(value: number) {
    const newValues = { ...values, health: value };
    setValues(newValues);
  }

  function setDamage(value: number) {
    const newValues = { ...values, damage: value };
    setValues(newValues);
  }

  return (
    <div className="App">
      <NumberInput name="health" text="Health" value={values.health} onChange={setHealth} />
      <NumberInput name="damage" text="Weapon Damage" value={values.damage} onChange={setDamage} positiveOnly />
    </div>
  );
}

export default App;
