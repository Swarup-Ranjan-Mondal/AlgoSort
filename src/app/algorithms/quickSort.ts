import {
  canvas,
  colorCodes,
} from '../components/bars-display/bars-display.component';
import BallModel from '../models/BallModel';
import {
  drawPartitionWall,
  removePartitionWall,
  visualizeSwap,
} from '../utils/sceneUtils';
import { drawBars, swap } from '../utils/canvasUtils';
import { sleep } from '../utils/essentials';

let ms: number;

export const visualizeQuickSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  await quickSortWithBallsUtil(
    unsortedNumbers,
    0,
    unsortedNumbers.length - 1,
    balls
  );
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
    drawPartitionWall(unsortedNumbers.length, low - 1);
  }
  drawPartitionWall(unsortedNumbers.length, high);

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
    removePartitionWall(unsortedNumbers.length, low - 1);
  }
  removePartitionWall(unsortedNumbers.length, high);

  return index + 1;
};

export const visualiseQuickSortWithBars = async (unsortedNumbers: number[]) => {
  ms = Math.floor(canvas.width / unsortedNumbers.length);
  await quickSortWithBarsUtil(unsortedNumbers, 0, unsortedNumbers.length - 1);
  console.log('Done');
};

const quickSortWithBarsUtil = async (
  unsortedNumbers: number[],
  low: number,
  high: number
) => {
  if (low < high) {
    var pi = await barsPartition(unsortedNumbers, low, high);

    await quickSortWithBarsUtil(unsortedNumbers, low, pi - 1);
    await quickSortWithBarsUtil(unsortedNumbers, pi + 1, high);
  }
};

const barsPartition = async (
  unsortedNumbers: number[],
  low: number,
  high: number
) => {
  for (let i = low; i < high; i++) {
    colorCodes[i] = 1;
  }
  colorCodes[high] = 2;

  drawBars(unsortedNumbers, colorCodes);

  let pivot = unsortedNumbers[high];
  let index = low - 1;

  for (let i = low; i <= high - 1; i++) {
    if (unsortedNumbers[i] < pivot) {
      index++;

      swap(unsortedNumbers, i, index);
      await sleep(ms);
    }
  }

  swap(unsortedNumbers, high, index + 1);
  await sleep(ms);

  for (var i = low; i <= high; i++) {
    colorCodes[i] = 0;
  }

  drawBars(unsortedNumbers, colorCodes);

  return index + 1;
};
