import { types, Instance } from 'mobx-state-tree';

export const FATIGUE_SCAFFOLD = {
  basePoints: 0,
  spend: 0
};

export const fatigueModel = types
  .model('fatigue', {
    basePoints: types.number,
    spend: types.number
  })
  .views(self => ({
    get availablePoints() {
      return self.basePoints - self.spend;
    }
  }))
  .actions(self => ({
    setBasePoints(points: number) {
      self.basePoints = points;
    },
    pay(points = 1) {
      if (self.spend + points <= self.basePoints) {
        self.spend += points;
      }
    },
    recover(points = 1) {
      if (self.spend - points >= 0) {
        self.spend -= points;
      }
    }
  }));

export type IFatigue = Instance<typeof fatigueModel>;
