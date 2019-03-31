import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Container } from 'reactstrap';
import CSS from './App.module.css';

import { AllCharacters } from './components/AllCharacters';
import { Character } from './components/Character';

import { IStore } from './store';
import { NewCharacter } from './components/Character/New';

@inject('store')
@observer
class App extends Component<{ store?: IStore }> {
  getCurrentView = () => {
    const { ui } = this.props.store!;
    if (ui.currentCharacter) {
      return <Character />;
    } else if (ui.newCharacter) {
      return <NewCharacter />;
    } else {
      return <AllCharacters />;
    }
  };

  render() {
    return <Container className={CSS.app}>{this.getCurrentView()}</Container>;
  }
}

export default App;
