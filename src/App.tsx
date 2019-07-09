import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

  // getCurrentView = () => {
  //   const { ui } = this.context;
  //   if (ui.currentCharacter) {
  //     return <Character />;
  //   } else if (ui.newCharacter) {
  //     return <NewCharacter />;
  //   } else {
  //     return <AllCharacters />;
  //   }
  // };

  render() {
    const store = this.context;
    return (
      store.ui.dataLoaded && (
        <Router>
          <Container className={CSS.app}>
            <Route exact path="/" component={AllCharacters} />
            <Route exact path="/new_character" component={NewCharacter} />
            <Route path="/characters/:characterId" component={Character} />
          </Container>
        </Router>
      )
    );
  }
}

export default App;
