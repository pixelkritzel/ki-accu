import { types, Instance } from 'mobx-state-tree';

export const characteristicModel = types
  .model('characteristic', {
    basePoints: types.number,
    accumulation: types.number,
    accumulatedPoints: 0,
    spendPoints: 0
  })
  .views(self => ({
    get availablePoints() {
      return self.basePoints - self.accumulatedPoints - self.spendPoints;
    }
  }))
  .actions(self => ({
    accumulate(half = false) {
      let newAccumulatedPoints = half ? Math.round(self.accumulation / 2) : self.accumulation;
      if (newAccumulatedPoints > self.availablePoints) {
        newAccumulatedPoints = self.availablePoints;
      }
      self.accumulatedPoints += newAccumulatedPoints;
    },
    accumulateHalf() {
      this.accumulate(true);
    },
    changeAccumulation(points: number) {
      if (points > -1) {
        self.accumulation = points;
      }
    },
    changeBasepoints(points: number) {
      if (points > -1) {
        self.basePoints = points;
      }
    },
    recover() {
      if (self.spendPoints > 0) {
        --self.spendPoints;
      }
    },
    returnAccumulatedPoints() {
      self.accumulatedPoints = 0;
    },
    payPoints(pointsToSpend: number) {
      if (pointsToSpend <= self.accumulatedPoints) {
        self.accumulatedPoints = self.accumulatedPoints - pointsToSpend;
        self.spendPoints += pointsToSpend;
      }
    }
  }));

export type ICharacteristic = Instance<typeof characteristicModel>;
