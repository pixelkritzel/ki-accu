import * as React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

import { ICharacteristic } from 'store/characteristic';
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
      currentAccumulation,
      currentHalfAccumulation,
      payPoints,
      payGenericPoints,
      recover,
      spendPoints
    } = model;
    return (
      <tr className={CSS.tr}>
        <td>{name}</td>
        <td>
          {availablePoints}/{basePoints}
        </td>
        <td>
          <Button className={cx('btn-sm', CSS.btn)} onClick={() => payGenericPoints()}>
            ⤼ 1
          </Button>
        </td>
        <td>
          <Button className={cx('btn-sm', CSS.btn)} onClick={accumulateHalf}>
            {currentHalfAccumulation} ⇒
          </Button>
        </td>
        <td>
          <Button className={cx('btn-sm', CSS.btn)} onClick={() => accumulate()}>
            {currentAccumulation} ⇒
          </Button>
        </td>
        <td>{accumulatedPoints}</td>
        <td>
          <Button className={cx('btn-sm', CSS.btn)} onClick={() => payPoints(1)}>
            1 ⇒
          </Button>
        </td>
        <td>{spendPoints}</td>
        <td>
          <Button className={cx('btn-sm', CSS.btn)} onClick={recover}>
            ⤺ 1
          </Button>
        </td>
      </tr>
    );
  }
}
