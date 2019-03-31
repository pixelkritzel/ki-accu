import { types } from 'mobx-state-tree';
import { characterModel, ICharacter } from './character';

export const uiModel = types
  .model('ui', {
    currentCharacter: types.maybe(types.reference(characterModel)),
    newCharacter: types.maybe(characterModel)
  })
  .actions(self => ({
    setCurrentCharacter(character?: ICharacter) {
      self.currentCharacter = character;
    }
  }));
