import React, { Component } from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';

const localStorageKey = 'kiAccu';

export const StoreContext = React.createContext();

export default class Store extends React.Component {
  // constructor(...args) {
  //   super(...args);
  //   const characterJSON = localStorage.getItem(localStorageKey);
  //   try {
  //     this.state = JSON.parse(characterJSON);
  //   } catch (e) {}
  // }

  onCharacterChange = (name, value) => {
    this.setState({ [name]: value }, () => localStorage.setItem(localStorageKey, JSON.stringify(this.state)));
  };

  state = {
    character: {
      name: 'Test',
      characteristics: [
        {
          name: 'agility',
          pool: 12,
          accumulation: 1,
          spendKiPoints: 0,
          accumulated: 0
        },
        {
          name: 'constitution',
          pool: 12,
          accumulation: 1,
          spendKiPoints: 0,
          accumulated: 0
        },
        {
          name: 'dexterity',
          pool: 12,
          accumulation: 1,
          spendKiPoints: 0,
          accumulated: 0
        },
        {
          name: 'strength',
          pool: 12,
          accumulation: 1,
          spendKiPoints: 0,
          accumulated: 0
        },
        {
          name: 'power',
          pool: 12,
          accumulation: 1,
          spendKiPoints: 0,
          accumulated: 0
        },
        {
          name: 'willpower',
          pool: 12,
          accumulation: 1,
          spendKiPoints: 0,
          accumulated: 0
        }
      ]
    }
  };

  set = (path, value) => {
    const stateUpdate = set({}, path, value);
    this.setState(stateUpdate);
  };

  get storeValue() {
    const { set } = this;
    return {
      values: this.state,
      actions: {
        set
      }
    };
  }

  render() {
    return <StoreContext.Provider value={this.storeValue}>{this.props.children}</StoreContext.Provider>;
  }
}
