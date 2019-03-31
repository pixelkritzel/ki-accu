import { types, Instance, detach } from 'mobx-state-tree';

import { characterModel, ICharacter } from './character';

export const dataModel = types.model('data', {
  characters: types.array(characterModel)
});

export type IData = Instance<typeof dataModel>;
