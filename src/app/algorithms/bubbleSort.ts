import BallModel from '../models/BallModel';
import { visualizeSwap } from '../utils/ballUtils';
import { colors, visualizeBarsSwap } from '../utils/barUtils';
import { map, sleep } from '../utils/essentials';
import BarModel from '../models/BarModel';

let length: number;
let ms: number;

export const visualizeBubbleSortWithBalls = async (
  array: number[],
  balls: BallModel[]
) => {
  length = array.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      await sleep(2);

      if (array[j] > array[j + 1]) {
        await visualizeSwap(array, j, j + 1, balls);
      }
    }
  }

  console.log('Done');
};

export const visualizeBubbleSortWithBars = async (
  array: number[],
  bars: BarModel[]
) => {
  length = array.length;
  ms = Math.floor(map(length, 2, 120, 2800, 1000) / length);

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      bars[j].color = colors[1];
      bars[j + 1].color = colors[1];
      await sleep(ms);

      if (array[j] > array[j + 1]) {
        await visualizeBarsSwap(array, j, j + 1, bars, Math.floor(0.8 * ms));
      }

      bars[j].color = colors[3];
      bars[j + 1].color = colors[3];
      await sleep(Math.floor(1.1 * ms));

      bars[j].color = colors[0];
      bars[j + 1].color = j + 1 === length - 1 - i ? colors[4] : colors[0];
    }
  }
  bars[0].color = colors[4];

  console.log('Done');
};
