import * as React from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import { Button } from 'reactstrap';

import { Actions } from './Actions';
import { Characteristics } from './Characteristics';
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
    const { name, fatigue, isFatigueBoosted } = currentCharacter!;
    return (
      <>
        <div className={CSS.header}>
          <h3>{name}</h3>
          <Button onClick={toggleEditForm}>Edit</Button>
        </div>
        <Actions character={currentCharacter!} />
        <Characteristics character={currentCharacter!} />
        <div className={CSS.additionalActions} />
        <Fatigue fatigue={fatigue} />
      </>
    );
  }
}
