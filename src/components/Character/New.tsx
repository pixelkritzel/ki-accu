import * as React from 'react';

import { CharacterForm } from './Form';
import { inject } from 'mobx-react';
import { IStore } from '@/store';

@inject('store')
export class NewCharacter extends React.Component<{ store?: IStore }> {
  submit = {
    submitFn: this.props.store!.addNewCharacter,
    submitButtonText: 'Add Character'
  };

  render() {
    return <CharacterForm submit={this.submit} />;
  }
}
