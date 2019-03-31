import { characteristicModel, ICharacteristic } from './characteristic';

let characteristic: ICharacteristic;

beforeEach(() => {
  characteristic = characteristicModel.create({
    basePoints: 10,
    accumulation: 3
  });
});

it('characteristicModel should accumulate full and adjust the remaining points', () => {
  characteristic.accumulate();
  expect(characteristic.accumulatedPoints).toEqual(3);
  expect(characteristic.availablePoints).toEqual(7);
});

it('characteristicModel should accumulate half', () => {
  characteristic.accumulateHalf();
  expect(characteristic.accumulatedPoints).toEqual(2);
});

it('spending points', () => {
  characteristic.accumulate();
  characteristic.payPoints(2);
  expect(characteristic.accumulatedPoints).toEqual(1);
  expect(characteristic.spendPoints).toEqual(2);
  expect(characteristic.availablePoints).toEqual(7);
  characteristic.payPoints(1);
  expect(characteristic.accumulatedPoints).toEqual(0);
  expect(characteristic.spendPoints).toEqual(3);
  expect(characteristic.availablePoints).toEqual(7);
  characteristic.payPoints(2);
  expect(characteristic.accumulatedPoints).toEqual(0);
  expect(characteristic.spendPoints).toEqual(3);
  expect(characteristic.availablePoints).toEqual(7);
});

it('return accumulated points', () => {
  characteristic.accumulate();
  characteristic.payPoints(2);
  characteristic.returnAccumulatedPoints();
  expect(characteristic.accumulatedPoints).toEqual(0);
  expect(characteristic.spendPoints).toEqual(2);
  expect(characteristic.availablePoints).toEqual(8);
});

it('recover spend points', () => {
  characteristic.accumulate();
  characteristic.payPoints(3);
  characteristic.recover();
  expect(characteristic.accumulatedPoints).toEqual(0);
  expect(characteristic.spendPoints).toEqual(2);
  expect(characteristic.availablePoints).toEqual(8);
});
