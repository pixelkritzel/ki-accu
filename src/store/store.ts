import { dataModel } from './data';
import * as localforage from 'localforage';
import { applySnapshot, onSnapshot, Instance, types } from 'mobx-state-tree';

import { uiModel } from './ui';
import { updateSavedData } from './updateSavedData';

const LOCALFORAGE_KEY = 'data';

export const EMPTY_STORE_LITERAL = {
  data: {
    version: 1,
    characters: []
  },
  ui: {}
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

    async loadData(savedData?: unknown) {
      const data = savedData || (await localforage.getItem(LOCALFORAGE_KEY));
      if (data) {
        try {
          updateSavedData(data);
          applySnapshot(self.data, data);
        } catch (e) {
          console.log(e);
        }
      }
      self.ui.setDataLoaded();
    }
  }));

export type IStore = Instance<typeof storeModel>;
