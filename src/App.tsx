import React, { useState } from 'react';
import './App.css';
import Weapon from './models/Weapon';
import WeaponInput from './components/WeaponInput';
import DiceExpression from './models/DiceExpression';
import CharacterInput from './components/CharacterInput';
import Character from './models/Character';
import AttackRoller from './components/AttackRoller';
import { AttackTypeGroup, FireTypeToAttackTypeMap } from './models/AttackRollerProps';
import AppState from './models/AppState';

function App() {
  
  const [state, setState] = useState<AppState>({
    character: {
      name: 'Drux',
      armorClass: 15,
      coverStatus: 0
    },
    weapon: {
      name: 'M8 Avenger',
      description: 'Standard issue alliance military assault rifle. Has quickly become a widely adopted defense platform across the galaxy.',
      weaponType: 'ARifle',
      damage: DiceExpression.Default,
      attackBonus: 0,
      critRange: 20,
      critMultiplier: 2,
      rateOfFire: 4,
      fireType: 'Auto',
      recoil: 2
    },
    attackTypeGroup: {
      attackType: 0,
      attackTypeOptions: determineAttackOptions('Auto')
    }
  });

  function setCharacter(character: Character) {
    setState({ ...state, character });
  }

  function setWeapon(weapon: Weapon) {
    const validAttackTypeOptions = determineAttackOptions(weapon.fireType);
    setState({
      ...state,
      weapon,
      attackTypeGroup: {
        attackTypeOptions: validAttackTypeOptions,
        attackType: validAttackTypeOptions[0]
      }
    });
  }

  function setAttackTypeGroup(attackTypeGroup: AttackTypeGroup) {
    setState({ ...state, attackTypeGroup });
  }

  function determineAttackOptions(fireType: string): number[] {
    return FireTypeToAttackTypeMap.get(fireType) || [0];
  }

  return (
    <div className="App">
      <p className="bigTitle">Mass Effect D20 Roller</p>
      <WeaponInput weapon={state.weapon} onChange={setWeapon} />
      <CharacterInput character={state.character} onChange={setCharacter} />
      <AttackRoller weapon={state.weapon} target={state.character} attackTypeGroup={state.attackTypeGroup} onChange={setAttackTypeGroup} />
    </div>
  );
}

export default App;
