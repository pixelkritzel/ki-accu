import React from 'react';
import set from 'lodash/set';

const localStorageKey = 'kiAccu';

export const StoreContext = React.createContext();

export default class Store extends React.Component {
  constructor(...args) {
    super(...args);
    const characterJSON = localStorage.getItem(localStorageKey);
    try {
      if (characterJSON) {
        this.state = JSON.parse(characterJSON);
      }
    } catch (e) {}
  }

  saveToLocalStorage = () => localStorage.setItem(localStorageKey, JSON.stringify(this.state));

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

  accumulate = (isFull = true) => {
    this.state.character.characteristics.forEach((c, index) => {
      let currentAccumulation = isFull ? c.accumulation : Math.ceil(c.accumulation / 2);
      const remainingPool = c.pool - c.accumulated - c.spendKiPoints - currentAccumulation;
      if (remainingPool < 0) {
        currentAccumulation += remainingPool;
      }
      if (currentAccumulation > 0) {
        this.set(`character.characteristics[${index}].accumulated`, c.accumulated + currentAccumulation);
      }
    });
  };

  recover = () => {
    this.state.character.characteristics.forEach((c, index) => {
      if (c.spendKiPoints > 0) this.set(`character.characteristics[${index}].spendKiPoints`, c.spendKiPoints - 1);
    });
  };

  reset = () => {
    this.state.character.characteristics.forEach((c, index) => {
      this.set(`character.characteristics[${index}].accumulated`, 0);
      this.set(`character.characteristics[${index}].spendKiPoints`, 0);
    });
  };

  set = (path, value) => {
    const stateUpdate = set(this.state, path, value);
    this.setState(stateUpdate, this.saveToLocalStorage);
  };

  spend = (characteristicName, amount = 1) => {
    const characteristicIndex = this.state.character.characteristics.findIndex(c => c.name === characteristicName);
    const { accumulated, spendKiPoints } = this.state.character.characteristics[characteristicIndex];
    const newAccumulated = accumulated - amount;
    if (newAccumulated > -1) {
      this.set(`character.characteristics[${characteristicIndex}].accumulated`, newAccumulated);
      this.set(`character.characteristics[${characteristicIndex}].spendKiPoints`, spendKiPoints + amount);
    }
  };

  get storeValue() {
    const { accumulate, recover, reset, set, spend } = this;
    return {
      values: this.state,
      actions: {
        accumulate,
        recover,
        reset,
        set,
        spend
      }
    };
  }

  render() {
    return <StoreContext.Provider value={this.storeValue}>{this.props.children}</StoreContext.Provider>;
  }
}
