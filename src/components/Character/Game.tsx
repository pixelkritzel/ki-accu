import * as React from 'react';
import { observer } from 'mobx-react';

import { Button } from 'reactstrap';

import { Actions } from './Actions';
import { Characteristics } from './Characteristics';
import { Fatigue } from './Fatigue';

import { StoreContext } from 'store/StoreContext';

import CSS from './Game.module.scss';
import { ICharacter } from 'store/character';

interface ICharacterViewProps {
  character: ICharacter;
  toggleEditForm: () => void;
}

@observer
export class GameView extends React.Component<ICharacterViewProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  render() {
    const { character, toggleEditForm } = this.props;
    const { name, fatigue } = character;
    return (
      <>
        <div className={CSS.header}>
          <h3>{name}</h3>
          <Button onClick={toggleEditForm}>Edit</Button>
        </div>
        <Actions character={character!} />
        <Characteristics character={character!} />
        <div className={CSS.additionalActions} />
        <Fatigue fatigue={fatigue} />
      </>
    );
  }
}
