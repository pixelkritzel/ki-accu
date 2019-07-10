import * as React from 'react';
import cx from 'classnames';

import Button from 'reactstrap/lib/Button';

import { ICharacter } from 'store/character';

import CSS from './Actions.module.scss';

export class Actions extends React.Component<{ character: ICharacter }> {
  render() {
    const { accumulate, boostAccumulationByFatique, clearFatiqueBoost, isFatigueBoosted, reset } = this.props.character;

    return (
      <div className={CSS.actions}>
        <Button className="btn-sm" onClick={boostAccumulationByFatique}>
          Spend Fatique for Ki
        </Button>
        <Button
          className={cx({ 'btn-sm btn-warning': isFatigueBoosted })}
          disabled={!isFatigueBoosted}
          onClick={clearFatiqueBoost}
        >
          Clear fatique boost
        </Button>
        <Button onClick={() => accumulate(true)}>Half Accumulation</Button>
        <Button onClick={() => accumulate()}>Full Accumulation</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    );
  }
}
