import BallModel from '../models/BallModel';
import {
  drawPartitionWall,
  removePartitionWall,
  visualizeSwap,
} from '../utils/ballUtils';
import { colors, visualizeBarsSwap } from '../utils/barUtils';
import { map, sleep } from '../utils/essentials';
import BarModel from '../models/BarModel';

let length: number;
let ms: number;

export const visualizeQuickSortWithBalls = async (
  array: number[],
  balls: BallModel[]
) => {
  length = array.length;

  await quickSortWithBallsUtil(array, 0, length - 1, balls);
  console.log('Done');
};

const quickSortWithBallsUtil = async (
  array: number[],
  low: number,
  high: number,
  balls: BallModel[]
) => {
  if (low < high) {
    let pi = await ballsPartition(array, low, high, balls);

    await quickSortWithBallsUtil(array, low, pi - 1, balls);
    await quickSortWithBallsUtil(array, pi + 1, high, balls);
  }
};

const ballsPartition = async (
  array: number[],
  low: number,
  high: number,
  balls: BallModel[]
) => {
  if (low > 0) {
    drawPartitionWall(length, low - 1);
  }
  drawPartitionWall(length, high);

  let pivot = array[high],
    index = low - 1;

  for (let i = low; i <= high - 1; i++) {
    if (array[i] < pivot) {
      index++;

      await visualizeSwap(array, i, index, balls);
    }
  }

  await visualizeSwap(array, high, index + 1, balls);

  if (low > 0) {
    removePartitionWall(length, low - 1);
  }
  removePartitionWall(length, high);

  return index + 1;
};

export const visualiseQuickSortWithBars = async (
  array: number[],
  bars: BarModel[]
) => {
  length = array.length;
  ms = Math.floor(map(length, 2, 120, 2700, 1700) / length);

  await quickSortWithBarsUtil(array, 0, length - 1, bars);
  console.log('Done');
};

const quickSortWithBarsUtil = async (
  array: number[],
  low: number,
  high: number,
  bars: BarModel[]
) => {
  if (low < high) {
    var pi = await barsPartition(array, low, high, bars);

    await quickSortWithBarsUtil(array, low, pi - 1, bars);
    await quickSortWithBarsUtil(array, pi + 1, high, bars);
  } else if (low === high) {
    bars[low].color = colors[4];
  }
};

const barsPartition = async (
  array: number[],
  low: number,
  high: number,
  bars: BarModel[]
) => {
  bars[high].color = colors[5];

  let pivot = array[high];
  let currPos = low;

  for (let i = low; i <= high - 1; i++) {
    const index = currPos;

    bars[i].color = colors[1];
    bars[currPos].color = colors[1];
    await sleep(ms);

    if (array[i] < pivot) {
      if (i !== currPos) {
        await visualizeBarsSwap(array, currPos, i, bars, Math.floor(0.8 * ms));
      }

      bars[i].color = colors[3];
      bars[currPos].color = colors[3];
      await sleep(Math.floor(1.1 * ms));

      currPos++;
    }

    bars[i].color = colors[0];
    bars[index].color = colors[0];
  }

  bars[currPos].color = colors[1];
  bars[high].color = colors[1];
  await sleep(ms);

  if (currPos !== high) {
    await visualizeBarsSwap(array, currPos, high, bars, Math.floor(0.8 * ms));
  }

  bars[high].color = colors[3];
  bars[currPos].color = colors[3];
  await sleep(Math.floor(1.1 * ms));

  bars[high].color = colors[0];
  bars[currPos].color = colors[4];

  return currPos;
};
