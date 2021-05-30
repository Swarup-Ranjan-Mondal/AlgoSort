import { scene } from '../components/balls-display/balls-display.component';
import {
  canvas,
  colorCodes,
} from '../components/bars-display/bars-display.component';
import BallModel from '../models/BallModel';
import {
  drawPartitionWall,
  removePartitionWall,
  visualizePutItAside,
  visualizePutItIn,
} from '../utils/sceneUtils';
import { drawBars } from '../utils/canvasUtils';
import { sleep } from '../utils/essentials';

let ms: number;

export const visualizeMergeSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  await mergeSortWithBallsUtil(
    unsortedNumbers,
    0,
    unsortedNumbers.length - 1,
    balls
  );
  console.log('Done');
};

const mergeSortWithBallsUtil = async (
  unsortedNumbers: number[],
  low: number,
  high: number,
  balls: BallModel[]
) => {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    drawPartitionWall(unsortedNumbers.length, mid);
    await sleep(5);

    await mergeSortWithBallsUtil(unsortedNumbers, low, mid, balls);
    await mergeSortWithBallsUtil(unsortedNumbers, mid + 1, high, balls);

    removePartitionWall(unsortedNumbers.length, mid);
    await sleep(5);

    await mergeBalls(unsortedNumbers, low, mid, high, balls);
  }
};

const mergeBalls = async (
  unsortedNumbers: number[],
  low: number,
  mid: number,
  high: number,
  balls: BallModel[]
) => {
  const A: number[] = [];
  const B: number[] = [];
  const C: number[] = [];

  for (let i = low; i <= mid; i++) {
    A.push(unsortedNumbers[i]);
  }

  for (let i = mid + 1; i <= high; i++) {
    B.push(unsortedNumbers[i]);
  }

  const w: number = scene.clientWidth / (high - low + 1);
  const mergedBallsDetail: BallModel[] = [];

  let i = 0;
  let j = 0;

  for (let k = low; k <= high; k++) {
    if (i > A.length - 1) {
      C.push(B[j]);
      await visualizePutItAside(
        unsortedNumbers,
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
        unsortedNumbers,
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
        unsortedNumbers,
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
        unsortedNumbers,
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
        unsortedNumbers,
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
        unsortedNumbers,
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
    if (C.length == unsortedNumbers.length) {
      visualizePutItIn(
        unsortedNumbers,
        low + k,
        k * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
    } else {
      await visualizePutItIn(
        unsortedNumbers,
        low + k,
        k * w + w / 2,
        scene.clientHeight / 2,
        balls
      );
    }
  }

  C.forEach((number, index) => {
    unsortedNumbers[low + index] = number;
  });
};

export const visualiseMergeSortWithBars = async (unsortedNumbers: number[]) => {
  ms = Math.floor(canvas.width / unsortedNumbers.length);
  await mergeSortWithBarsUtil(unsortedNumbers, 0, unsortedNumbers.length - 1);
  console.log('Done');
};

const mergeSortWithBarsUtil = async (
  unsortedNumbers: number[],
  low: number,
  high: number
) => {
  if (low < high) {
    var mid = Math.floor((low + high) / 2);

    await mergeSortWithBarsUtil(unsortedNumbers, low, mid);
    await mergeSortWithBarsUtil(unsortedNumbers, mid + 1, high);

    for (var i = low; i <= high; i++) {
      colorCodes[i] = 1;
    }
    colorCodes[mid] = 2;

    await sleep(ms / 2);

    await mergeBars(unsortedNumbers, low, mid, high);

    for (var i = low; i <= high; i++) {
      colorCodes[i] = 0;
    }
    drawBars(unsortedNumbers, colorCodes);
  }
};

const mergeBars = async (
  unsortedNumbers: number[],
  low: number,
  mid: number,
  high: number
) => {
  let A: number[] = [];
  let B: number[] = [];

  for (let i = low; i <= mid; i++) {
    A.push(unsortedNumbers[i]);
  }

  for (let i = mid + 1; i <= high; i++) {
    B.push(unsortedNumbers[i]);
  }

  let i = 0;
  let j = 0;

  for (var k = low; k <= high; k++) {
    if (i > A.length - 1) {
      unsortedNumbers[k] = B[j++];
    } else if (j > B.length - 1) {
      unsortedNumbers[k] = A[i++];
    } else if (A[i] < B[j]) {
      unsortedNumbers[k] = A[i++];
    } else if (B[j] < A[i]) {
      unsortedNumbers[k] = B[j++];
    } else if (A[i] == B[j]) {
      unsortedNumbers[k++] = A[i++];
      unsortedNumbers[k] = B[j++];
    }

    drawBars(unsortedNumbers, colorCodes);
    await sleep(ms / 2);
  }
};
