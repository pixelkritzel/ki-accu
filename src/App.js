import React, { Component } from 'react';

import CharacterForm from './CharacterForm';
import Game from './Game';
import Navbar from './Navbar';
import Store from './Store';

import CSS from './App.module.css';

class App extends Component {
  state = {
    viewName: 'characterForm'
  };

  setView = viewName => {
    this.setState({ viewName });
  };

  render() {
    return (
      <Store>
        <div className={'container ' + CSS.app}>
          <Navbar setView={this.setView} />
          {this.state.viewName === 'characterForm' ? <CharacterForm /> : <Game />}
        </div>
      </Store>
    );
  }
}

export default App;
