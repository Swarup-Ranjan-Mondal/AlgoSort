import { scene } from '../components/balls-display/balls-display.component';
import BallModel from '../models/BallModel';
import {
  drawPartitionWall,
  removePartitionWall,
  visualizePutItAside,
  visualizePutItIn,
} from '../utils/ballUtils';
import { colors, visualizeBarsSwap } from '../utils/barUtils';
import { map, sleep } from '../utils/essentials';
import BarModel from '../models/BarModel';

let length: number;
let ms: number;

export const visualizeMergeSortWithBalls = async (
  array: number[],
  balls: BallModel[]
) => {
  length = array.length;

  await mergeSortWithBallsUtil(array, 0, length - 1, balls);
  console.log('Done');
};

const mergeSortWithBallsUtil = async (
  array: number[],
  low: number,
  high: number,
  balls: BallModel[]
) => {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    drawPartitionWall(length, mid);
    await sleep(5);

    await mergeSortWithBallsUtil(array, low, mid, balls);
    await mergeSortWithBallsUtil(array, mid + 1, high, balls);

    removePartitionWall(length, mid);
    await sleep(5);

    await mergeBalls(array, low, mid, high, balls);
  }
};

const mergeBalls = async (
  array: number[],
  low: number,
  mid: number,
  high: number,
  balls: BallModel[]
) => {
  const A: number[] = [];
  const B: number[] = [];
  const C: number[] = [];

  for (let i = low; i <= mid; i++) {
    A.push(array[i]);
  }

  for (let i = mid + 1; i <= high; i++) {
    B.push(array[i]);
  }

  const w: number = scene.clientWidth / (high - low + 1);
  const mergedBallsDetail: BallModel[] = [];

  let i = 0;
  let j = 0;

  for (let k = low; k <= high; k++) {
    if (i > A.length - 1) {
      C.push(B[j]);
      await visualizePutItAside(
        array,
        mid + j + 1,
        (k - low) * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
      mergedBallsDetail.push(balls[mid + j + 1]);

      j++;
    } else if (j > B.length - 1) {
      C.push(A[i]);
      await visualizePutItAside(
        array,
        low + i,
        (k - low) * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
      mergedBallsDetail.push(balls[low + i]);

      i++;
    } else if (A[i] < B[j]) {
      C.push(A[i]);
      await visualizePutItAside(
        array,
        low + i,
        (k - low) * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
      mergedBallsDetail.push(balls[low + i]);

      i++;
    } else if (B[j] < A[i]) {
      C.push(B[j]);
      await visualizePutItAside(
        array,
        mid + j + 1,
        (k - low) * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
      mergedBallsDetail.push(balls[mid + j + 1]);

      j++;
    } else if (A[i] == B[j]) {
      C.push(A[i]);
      await visualizePutItAside(
        array,
        low + i,
        (k - low) * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
      mergedBallsDetail.push(balls[low + i]);

      i++;
      k++;

      C.push(B[j]);
      await visualizePutItAside(
        array,
        mid + j + 1,
        (k - low) * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
      mergedBallsDetail.push(balls[mid + j + 1]);

      j++;
    }
  }

  mergedBallsDetail.forEach((ballDetails, index) => {
    balls[low + index] = ballDetails;
  });
  await sleep(0);

  for (let k = 0; k < C.length; k++) {
    if (C.length == length) {
      visualizePutItIn(
        array,
        low + k,
        k * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
    } else {
      await visualizePutItIn(
        array,
        low + k,
        k * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
    }
  }

  C.forEach((number, index) => {
    array[low + index] = number;
  });
};

export const visualiseMergeSortWithBars = async (
  array: number[],
  bars: BarModel[]
) => {
  length = array.length;
  ms = Math.floor(map(length, 2, 120, 2600, 1200) / length);

  await mergeSortWithBarsUtil(array, 0, length - 1, bars);
  console.log('Done');
};

const mergeSortWithBarsUtil = async (
  array: number[],
  low: number,
  high: number,
  bars: BarModel[]
) => {
  if (low < high) {
    var mid = Math.floor((low + high) / 2);

    await mergeSortWithBarsUtil(array, low, mid, bars);
    await mergeSortWithBarsUtil(array, mid + 1, high, bars);

    await sleep(ms);
    await mergeBars(array, low, mid, high, bars);
  }
};

const mergeBars = async (
  array: number[],
  low: number,
  mid: number,
  high: number,
  bars: BarModel[]
) => {
  let i = low;
  let j = mid;

  while (i < high && j < high) {
    if (i === j + 1) {
      break;
    }

    bars[i].color = colors[1];
    bars[j + 1].color = colors[1];
    await sleep(Math.floor(0.8 * ms));

    if (array[i] <= array[j + 1]) {
      await sleep(Math.ceil(0.2 * ms));

      bars[i].color = colors[3];
      bars[j + 1].color = colors[3];
      await sleep(Math.floor(1.1 * ms));

      bars[i].color = high - low === length - 1 ? colors[4] : colors[0];
      bars[j + 1].color = colors[0];
      i++;
    } else {
      const temp = array[j + 1];
      const tempBar = bars[j + 1];

      for (let l = j + 1; l > i + 1; l--) {
        array[l] = array[l - 1];
        bars[l] = bars[l - 1];
      }
      array[i + 1] = temp;
      bars[i + 1] = tempBar;
      await sleep(ms);

      await visualizeBarsSwap(array, i, i + 1, bars, Math.floor(0.8 * ms));

      bars[i].color = colors[3];
      bars[i + 1].color = colors[3];
      await sleep(Math.floor(1.1 * ms));

      bars[i].color = colors[0];
      bars[i + 1].color = colors[0];
      j++;
    }
  }

  if (low === 0 && high === length - 1 && (i < high || j < high)) {
    for (let k = i <= j + 1 ? i : j + 1; k <= high; k++) {
      bars[k].color = colors[4];
      await sleep(ms);
    }
  }
};
