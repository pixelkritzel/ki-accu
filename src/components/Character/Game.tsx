import * as React from 'react';
import { observer } from 'mobx-react';

import { Button } from 'reactstrap';

import { Actions } from './Actions';
import { Characteristics } from './Characteristics';
import { Fatigue } from './Fatigue';

import { StoreContext } from '@/store/StoreContext';

import CSS from './Game.module.scss';

interface ICharacterViewProps {
  toggleEditForm: () => void;
}

@observer
export class GameView extends React.Component<ICharacterViewProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  render() {
    const { toggleEditForm } = this.props;
    const { currentCharacter } = this.context.ui;
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
