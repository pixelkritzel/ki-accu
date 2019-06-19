import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Container } from 'reactstrap';
import CSS from './App.module.css';

import { AllCharacters } from './components/AllCharacters';
import { Character } from './components/Character';
import { NewCharacter } from './components/Character/New';

import { StoreContext } from './store/StoreContext';

@observer
class App extends Component {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  getCurrentView = () => {
    const { ui } = this.context;
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
