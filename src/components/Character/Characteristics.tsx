import * as React from 'react';

import { Table } from 'reactstrap';
import { CharacteristicRow } from './CharacteristicRow';

import { ICharacter } from 'store/character';

import CSS from './Characteristics.module.scss';
import { observer } from 'mobx-react';

@observer
export class Characteristics extends React.Component<{ character: ICharacter }> {
  render() {
    const { character } = this.props;
    const { characteristics, sumOf } = character;
    return (
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
          <tr className={CSS.sum}>
            <td>SUM</td>
            <td>{sumOf('availablePoints')}</td>
            <td />
            <td />
            <td />
            <td>{sumOf('accumulatedPoints')}</td>
            <td />
            <td>{sumOf('spendPoints')}</td>
            <td />
          </tr>
        </tbody>
      </Table>
    );
  }
}
