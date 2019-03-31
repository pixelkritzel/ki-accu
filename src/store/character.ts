import { types, Instance } from 'mobx-state-tree';
import { characteristicModel } from './characteristic';
import uuid4 from 'uuid/v4';

const CHARACTERISTIC_SCAFFOLD = {
  basePoints: 0,
  accumulation: 0
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
    })
  })
  .actions(self => ({
    changeName(name: string) {
      self.name = name;
    }
  }));

export type ICharacter = Instance<typeof characterModel>;
