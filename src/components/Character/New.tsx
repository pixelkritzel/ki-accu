import * as React from 'react';

import { BackButton } from './BackButton';
import { CharacterForm } from './Form';

import { StoreContext } from '@/store/StoreContext';
import { RouteComponentProps } from 'react-router';
import { ICharacter, characterModel, CHARACTER_SCAFFOLD } from '@/store/character';

export class NewCharacter extends React.Component<RouteComponentProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;
  character: ICharacter;

  constructor(props: any) {
    super(props);
    this.character = characterModel.create(CHARACTER_SCAFFOLD);
  }

  submit = () => {
    const store = this.context;
    const { history } = this.props;
    store.data.addNewCharacter(this.character);
    history.push(`/characters/${this.character.id}`);
  };

  render() {
    const submit = {
      submitFn: this.submit,
      submitButtonText: 'Add Character'
    };

    return (
      <>
        <BackButton />
        <hr />
        <CharacterForm character={this.character} submit={submit} />
      </>
    );
  }
}
