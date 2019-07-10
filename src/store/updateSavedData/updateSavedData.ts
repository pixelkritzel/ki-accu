import { FATIGUE_SCAFFOLD } from 'store/fatigue';
import { each } from 'lodash';

function updateToOne(savedData: any) {
  console.log('updating to v1');
  savedData.version = 1;
  savedData.characters.forEach((char: any) => {
    char.fatigue = FATIGUE_SCAFFOLD;
    each(char.characteristics, (characteristic: any) => (characteristic.modifiers = {}));
  });
}

const updateFns = [updateToOne];

export function updateSavedData(savedData: any) {
  savedData.version = savedData.version || 0;
  updateFns.forEach((update, index) => {
    if (index < savedData.version - 1) {
      update(savedData);
    }
  });
}
