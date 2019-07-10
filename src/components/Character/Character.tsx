import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { CharacterForm } from './Form';
import { GameView } from './Game';
import { CharacterHeader } from './Header';
import { StoreContext } from 'store/StoreContext';

@observer
export class Character extends React.Component<RouteComponentProps<{ characterId: string }>> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  @observable showEditForm = false;

  @action toggleEditForm = () => {
    this.showEditForm = !this.showEditForm;
  };

  render() {
    const { history, match } = this.props;
    const { characterId } = match.params;
    const store = this.context;
    const character = store.data.characters.find(({ id }) => id === characterId);
    return (
      <>
        <CharacterHeader character={character!} history={history} />
        {this.showEditForm ? (
          <CharacterForm
            character={character!}
            submit={{ submitFn: this.toggleEditForm, submitButtonText: 'Close form' }}
          />
        ) : (
          <GameView character={character!} toggleEditForm={this.toggleEditForm} />
        )}
      </>
    );
  }
}
