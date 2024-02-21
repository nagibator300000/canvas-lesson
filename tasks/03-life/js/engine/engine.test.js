import { describe, expect, test } from 'vitest';
import Engine from './engine';

const Fcanvas = {
  getContext: () => {
    return {
      beginPath: () => {},
      fillRect: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      clearRect: () => {},
    };
  },
  addEventListener: () => {},
};

const engine = new Engine(Fcanvas);

describe('getFromTo', () => {
  test('Standart', () => {
    expect(engine.getFromTo(1)).toStrictEqual([0, 2]);
  });
  test('From 0', () => {
    expect(engine.getFromTo(0)).toStrictEqual([0, 1]);
  });

  test('To 9', () => {
    expect(engine.getFromTo(9)).toStrictEqual([8, 9]);
  });
});
describe('calculateNeighbours', () => {
  test('centre without neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(2, 2)).toBe(0);
  });
  test('centre with neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(2, 2)).toBe(4);
  });
  test('next to centre without neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(2, 1)).toBe(0);
  });
  test('next to centre with neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(2, 1)).toBe(3);
  });
  test('top rigth without neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(0, 9)).toBe(0);
  });
  test('top rigth with neighbours', () => {
    engine.grid = [
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(0, 9)).toBe(2);
  });
  test('top left without neighbours', () => {
    engine.grid = [
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(0, 0)).toBe(0);
  });
  test('top left with neighbours', () => {
    engine.grid = [
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(0, 0)).toBe(2);
  });
  test('bottom left without neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(9, 0)).toBe(0);
  });
  test('bottom left with neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ];
    expect(engine.calculateNeighbours(9, 0)).toBe(1);
  });
  test('bottom right without neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
    ];
    expect(engine.calculateNeighbours(9, 9)).toBe(0);
  });
  test('bottom right with neighbours', () => {
    engine.grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1],
    ];
    expect(engine.calculateNeighbours(9, 9)).toBe(2);
  });
});

describe('updateGrid', () => {
  test('static', () => {
    engine.grid = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    engine.updateGrid();
    expect(engine.grid).toBe([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });
  test('cycle', () => {
    engine.grid = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    engine.updateGrid();
    engine.updateGrid();
    expect(engine.grid).toBe([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);
  });
  test('disappear', () => {
    engine.grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    engine.updateGrid();
    expect(engine.grid).toBe([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
  test('create', () => {
    engine.grid = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
    ];
    engine.updateGrid();
    expect(engine.grid).toBe([
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
  });
});
