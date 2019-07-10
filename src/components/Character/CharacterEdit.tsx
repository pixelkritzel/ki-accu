import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { StoreContext } from 'store/StoreContext';
import { CharacterForm } from './Form';

export class CharacterEdit extends React.Component<RouteComponentProps<{ characterId: string }>> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  submit = {
    submitFn: () => this.props.history.push(`/characters/${this.props.match.params.characterId}`),
    submitButtonText: 'Close form'
  };

  render() {
    const { match } = this.props;
    const { characterId } = match.params;
    const store = this.context;
    const character = store.data.characters.find(({ id }) => id === characterId);
    return <CharacterForm character={character!} submit={this.submit} />;
  }
}
