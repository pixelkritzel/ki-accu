import { types } from 'mobx-state-tree';
import { characterModel, ICharacter } from './character';

export const uiModel = types
  .model('ui', {
    dataLoaded: false,
    newCharacter: types.maybe(characterModel)
  })
  .actions(self => ({
    setDataLoaded() {
      self.dataLoaded = true;
    }
  }));
