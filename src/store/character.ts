import { types, Instance } from 'mobx-state-tree';
import uuid4 from 'uuid/v4';

import { characteristicModel, ICharacteristic } from './characteristic';
import { fatigueModel } from './fatigue';

const CHARACTERISTIC_SCAFFOLD = {
  basePoints: 0,
  accumulation: 0,
  modifiers: {}
};

export const CHARACTER_SCAFFOLD = {
  name: 'SHREK',
  characteristics: {
    agility: CHARACTERISTIC_SCAFFOLD,
    constitution: CHARACTERISTIC_SCAFFOLD,
    dexterity: CHARACTERISTIC_SCAFFOLD,
    strength: CHARACTERISTIC_SCAFFOLD,
    power: CHARACTERISTIC_SCAFFOLD,
    willpower: CHARACTERISTIC_SCAFFOLD
  },
  fatigue: {
    basePoints: 0,
    spend: 0
  }
};

export const characterModel = types
  .model('character', {
    id: types.optional(types.identifier, uuid4),
    name: types.string,
    characteristics: types.model({
      agility: characteristicModel,
      constitution: characteristicModel,
      dexterity: characteristicModel,
      strength: characteristicModel,
      power: characteristicModel,
      willpower: characteristicModel
    }),
    fatigue: fatigueModel
  })
  .views(self => ({
    get isFatigueBoosted() {
      const { characteristics } = self;
      return !!Object.keys(characteristics).reduce((res, curr) => {
        const characteristic = characteristics[curr as keyof ICharacter['characteristics']] as ICharacteristic;
        return res + characteristic.modifiers.fromFatigue;
      }, 0);
    },
    sumOf(propName: 'availablePoints' | 'accumulatedPoints' | 'spendPoints') {
      const { characteristics } = self;
      return Object.keys(characteristics).reduce((res, curr) => {
        const characteristic = characteristics[curr as keyof ICharacter['characteristics']] as ICharacteristic;
        return res + characteristic[propName];
      }, 0);
    }
  }))
  .actions(self => ({
    accumulate(half = false) {
      const { characteristics } = self;
      for (const characteristicName in characteristics) {
        const characteristic = characteristics[
          characteristicName as keyof ICharacter['characteristics']
        ] as ICharacteristic;
        characteristic.accumulate(half);
      }
    },

    boostAccumulationByFatique() {
      if (self.fatigue.availablePoints > 0) {
        const { characteristics } = self;
        self.fatigue.pay();
        for (const characteristicName in characteristics) {
          const characteristic = characteristics[
            characteristicName as keyof ICharacter['characteristics']
          ] as ICharacteristic;
          characteristic.modifiers.fromFatigue++;
        }
      }
    },
    changeName(name: string) {
      self.name = name;
    },
    clearFatiqueBoost() {
      const { characteristics } = self;
      for (const characteristicName in characteristics) {
        const characteristic = characteristics[
          characteristicName as keyof ICharacter['characteristics']
        ] as ICharacteristic;
        characteristic.modifiers.fromFatigue = 0;
      }
    },
    reset() {
      this.clearFatiqueBoost();
      self.fatigue.spend = 0;
      const { characteristics } = self;
      for (const characteristicName in characteristics) {
        const characteristic = characteristics[
          characteristicName as keyof ICharacter['characteristics']
        ] as ICharacteristic;
        characteristic.reset();
      }
    }
  }));

export type ICharacter = Instance<typeof characterModel>;
