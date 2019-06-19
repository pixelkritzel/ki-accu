import * as React from 'react';

import { CharacterForm } from './Form';

import { StoreContext } from '@/store/StoreContext';

export class NewCharacter extends React.Component {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  submit = {
    submitFn: this.context.addNewCharacter,
    submitButtonText: 'Add Character'
  };

  render() {
    return <CharacterForm submit={this.submit} />;
  }
}
