import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { CharacterForm } from './Form';
import { GameView } from './Game';
import { CharacterHeader } from './Header';

@observer
export class Character extends React.Component {
  @observable showEditForm = false;

  @action toggleEditForm = () => {
    this.showEditForm = !this.showEditForm;
  };

  render() {
    return (
      <>
        <CharacterHeader />
        {this.showEditForm ? (
          <CharacterForm submit={{ submitFn: this.toggleEditForm, submitButtonText: 'Close form' }} />
        ) : (
          <GameView toggleEditForm={this.toggleEditForm} />
        )}
      </>
    );
  }
}
