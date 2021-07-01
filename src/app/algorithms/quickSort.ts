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
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  length = unsortedNumbers.length;

  await quickSortWithBallsUtil(unsortedNumbers, 0, length - 1, balls);
  console.log('Done');
};

const quickSortWithBallsUtil = async (
  unsortedNumbers: number[],
  low: number,
  high: number,
  balls: BallModel[]
) => {
  if (low < high) {
    let pi = await ballsPartition(unsortedNumbers, low, high, balls);

    await quickSortWithBallsUtil(unsortedNumbers, low, pi - 1, balls);
    await quickSortWithBallsUtil(unsortedNumbers, pi + 1, high, balls);
  }
};

const ballsPartition = async (
  unsortedNumbers: number[],
  low: number,
  high: number,
  balls: BallModel[]
) => {
  if (low > 0) {
    drawPartitionWall(length, low - 1);
  }
  drawPartitionWall(length, high);

  let pivot = unsortedNumbers[high],
    index = low - 1;

  for (let i = low; i <= high - 1; i++) {
    if (unsortedNumbers[i] < pivot) {
      index++;

      await visualizeSwap(unsortedNumbers, i, index, balls);
    }
  }

  await visualizeSwap(unsortedNumbers, high, index + 1, balls);

  if (low > 0) {
    removePartitionWall(length, low - 1);
  }
  removePartitionWall(length, high);

  return index + 1;
};

export const visualiseQuickSortWithBars = async (
  unsortedNumbers: number[],
  bars: BarModel[]
) => {
  length = unsortedNumbers.length;
  ms = Math.floor(map(length, 2, 120, 2700, 1700) / length);

  await quickSortWithBarsUtil(unsortedNumbers, 0, length - 1, bars);
  console.log('Done');
};

const quickSortWithBarsUtil = async (
  unsortedNumbers: number[],
  low: number,
  high: number,
  bars: BarModel[]
) => {
  if (low < high) {
    var pi = await barsPartition(unsortedNumbers, low, high, bars);

    await quickSortWithBarsUtil(unsortedNumbers, low, pi - 1, bars);
    await quickSortWithBarsUtil(unsortedNumbers, pi + 1, high, bars);
  } else if (low === high) {
    bars[low].color = colors[4];
  }
};

const barsPartition = async (
  unsortedNumbers: number[],
  low: number,
  high: number,
  bars: BarModel[]
) => {
  bars[high].color = colors[5];

  let pivot = unsortedNumbers[high];
  let currPos = low;

  for (let i = low; i <= high - 1; i++) {
    const index = currPos;

    bars[i].color = colors[1];
    bars[currPos].color = colors[1];
    await sleep(ms);

    if (unsortedNumbers[i] < pivot) {
      if (i !== currPos) {
        await visualizeBarsSwap(
          unsortedNumbers,
          currPos,
          i,
          bars,
          Math.floor(0.8 * ms)
        );
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
    await visualizeBarsSwap(
      unsortedNumbers,
      currPos,
      high,
      bars,
      Math.floor(0.8 * ms)
    );
  }

  bars[high].color = colors[3];
  bars[currPos].color = colors[3];
  await sleep(Math.floor(1.1 * ms));

  bars[high].color = colors[0];
  bars[currPos].color = colors[4];

  return currPos;
};
