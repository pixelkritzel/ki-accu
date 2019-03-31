import * as React from 'react';
import { observer } from 'mobx-react';

import { ICharacteristic } from '@/store/characteristic';
import { Button } from 'reactstrap';

import CSS from './CharacteristicRow.module.scss';

interface ICharacteristicRowProps {
  name: string;
  model: ICharacteristic;
}

@observer
export class CharacteristicRow extends React.Component<ICharacteristicRowProps> {
  render() {
    const { name, model } = this.props;
    const {
      accumulate,
      accumulateHalf,
      accumulatedPoints,
      availablePoints,
      basePoints,
      payPoints,
      recover,
      spendPoints
    } = model;
    return (
      <tr className={CSS.tr}>
        <td>{name}</td>
        <td>
          {' '}
          {availablePoints}/{basePoints}
        </td>
        <td>
          <Button className={CSS.btn} onClick={accumulateHalf}>
            &times;½
          </Button>
          <Button className={CSS.btn} onClick={() => accumulate()}>
            &times;1
          </Button>
        </td>
        <td>{accumulatedPoints}</td>
        <td>
          <Button className={CSS.btn} onClick={() => payPoints(1)}>
            -1
          </Button>
        </td>
        <td>{spendPoints}</td>
        <td>
          <Button className={CSS.btn} onClick={recover}>
            -1
          </Button>
        </td>
      </tr>
    );
  }
}
