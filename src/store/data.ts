import { types, Instance } from 'mobx-state-tree';

import { characterModel, ICharacter } from './character';

export const dataModel = types
  .model('data', {
    version: 1,
    characters: types.array(characterModel)
  })
  .actions(self => ({
    addNewCharacter(character: ICharacter) {
      self.characters.push(character);
    },
    deleteCharacter(character: ICharacter) {
      const index = self.characters.indexOf(character);
      self.characters.splice(index, 1);
    }
  }));

export type IData = Instance<typeof dataModel>;
