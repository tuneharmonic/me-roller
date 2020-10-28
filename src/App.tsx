import React, { useState } from 'react';
import './App.css';
import Weapon from './models/Weapon';
import WeaponInput from './components/WeaponInput';
import DiceExpression from './models/DiceExpression';
import CharacterInput from './components/CharacterInput';
import AppState from './models/AppState';
import Character from './models/Character';
import AttackRoller from './components/AttackRoller';
import { FireTypeToAttackTypeMap } from './models/AttackRollerProps';

function App() {
  const initialState: AppState = {
    character: {
      name: 'Drux',
      armorClass: 15,
      coverStatus: 0
    },
    weapon: new Weapon(
      'M8 Avenger',
      'Standard issue alliance military assault rifle. Has quickly become a widely adopted defense platform across the galaxy.',
      'ARifle',
      DiceExpression.Default,
      0,
      20,
      2,
      4,
      'Auto',
      2)
  };

  const [state, setState] = useState(initialState);

  function setCharacter(character: Character) {
    setState({ ...state, character });
  }

  function setWeapon(weapon: Weapon) {
    setState({ ...state, weapon });
  }

  function determineAttackOptions(): number[] {
    return FireTypeToAttackTypeMap.get(state.weapon.fireType) || [0];
  }

  return (
    <div className="App">
      <p className="bigTitle">Mass Effect D20 Roller</p>
      <WeaponInput weapon={state.weapon} onChange={setWeapon} />
      <CharacterInput character={state.character} onChange={setCharacter} />
      <AttackRoller weapon={state.weapon} target={state.character} attackOptions={determineAttackOptions()} />
    </div>
  );
}

export default App;
