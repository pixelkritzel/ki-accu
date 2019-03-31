import { dataModel, IData } from './data';
import * as localforage from 'localforage';
import { applySnapshot, onSnapshot, Instance, types, detach } from 'mobx-state-tree';

import { characterModel, CHARACTER_SCAFFOLD } from './character';
import { uiModel } from './ui';
import { updateSavedData } from './updateSavedData';

const LOCALFORAGE_KEY = 'data';

export const EMPTY_STORE_LITERAL = {
  data: {
    characters: []
  },
  ui: {
    currentCharacter: undefined
  }
};

localforage.config({
  name: 'ki-accu',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'ki_accu'
});

export const storeModel = types
  .model('store', {
    data: dataModel,
    ui: uiModel
  })
  .actions(self => ({
    afterCreate() {
      this.loadData();
      onSnapshot(self.data, snapshot => {
        localforage.setItem(LOCALFORAGE_KEY, snapshot);
      });
    },

    async loadData() {
      const savedData = await localforage.getItem(LOCALFORAGE_KEY);
      try {
        updateSavedData(savedData);
        applySnapshot(self.data, savedData);
      } catch (e) {
        console.log(e);
      }
    },

    addNewCharacter() {
      const newCharacter = detach(self.ui.newCharacter!);
      self.data.characters.push(newCharacter);
    },

    newCharacter() {
      self.ui.newCharacter = characterModel.create(CHARACTER_SCAFFOLD);
    }
  }));

export type IStore = Instance<typeof storeModel>;
