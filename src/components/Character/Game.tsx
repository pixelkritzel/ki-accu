import * as React from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import { Table, Button } from 'reactstrap';

import { CharacteristicRow } from './CharacteristicRow';
import { Fatigue } from './Fatigue';

import { IStore } from '@/store';

import CSS from './Game.module.scss';

interface ICharacterViewProps {
  store?: IStore;
  toggleEditForm: () => void;
}

@inject('store')
@observer
export class GameView extends React.Component<ICharacterViewProps> {
  render() {
    const { store, toggleEditForm } = this.props;
    const { currentCharacter } = store!.ui;
    const { name, characteristics, fatigue, isFatigueBoosted } = currentCharacter!;
    return (
      <>
        <div className={CSS.header}>
          <h3>{name}</h3>
          <Button onClick={toggleEditForm}>Edit</Button>
        </div>
        <Table size="sm" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Characteristic</th>
              <th>Available</th>
              <th>Gen.</th>
              <th>&times;½</th>
              <th>&times;1</th>
              <th>Accumulated</th>
              <th />
              <th>Spend</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <CharacteristicRow name="Agility" model={characteristics.agility} />
            <CharacteristicRow name="Constitution" model={characteristics.constitution} />
            <CharacteristicRow name="Dexterity" model={characteristics.dexterity} />
            <CharacteristicRow name="Strength" model={characteristics.strength} />
            <CharacteristicRow name="Power" model={characteristics.power} />
            <CharacteristicRow name="Willpower" model={characteristics.willpower} />
          </tbody>
        </Table>
        <div className={CSS.additionalActions}>
          <Button className="btn-sm" onClick={currentCharacter!.boostAccumulationByFatique}>
            Spend Fatique for Ki
          </Button>
          <Button
            className={cx({ 'btn-sm btn-warning': isFatigueBoosted })}
            disabled={!isFatigueBoosted}
            onClick={currentCharacter!.clearFatiqueBoost}
          >
            Clear fatique boost
          </Button>
        </div>
        <Fatigue fatigue={fatigue} />
      </>
    );
  }
}
