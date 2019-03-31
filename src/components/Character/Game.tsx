import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Table, Button } from 'reactstrap';

import { CharacteristicRow } from './CharacteristicRow';

import { IStore, storeModel } from '@/store';

import CSS from './View.module.scss';

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
    const { name, characteristics } = currentCharacter!;
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
              <th />
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
      </>
    );
  }
}
