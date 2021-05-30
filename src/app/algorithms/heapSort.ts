import { scene } from '../components/balls-display/balls-display.component';
import {
  canvas,
  colorCodes,
} from '../components/bars-display/bars-display.component';
import BallModel from '../models/BallModel';
import {
  visualizePutItAside,
  visualizePutItIn,
  visualizeRelocate,
  visualizeSwap,
} from '../utils/sceneUtils';
import { drawBars, swap } from '../utils/canvasUtils';
import { sleep } from '../utils/essentials';

let ms: number;

export const visualizeHeapSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  const w = scene.clientWidth / unsortedNumbers.length;

  for (let i = unsortedNumbers.length - 1; i >= 0; i--) {
    await heapifyBalls(unsortedNumbers, i, unsortedNumbers.length - 1, balls);
  }

  for (let i = unsortedNumbers.length - 1; i >= 0; i--) {
    await visualizePutItAside(
      unsortedNumbers,
      0,
      (i + 0.5) * w,
      scene.clientHeight / 2,
      balls
    );

    if (i > 0) {
      await visualizeRelocate(unsortedNumbers, i, 0, balls);
      [balls[0], balls[i]] = [balls[i], balls[0]];
      [unsortedNumbers[0], unsortedNumbers[i]] = [
        unsortedNumbers[i],
        unsortedNumbers[0],
      ];
      await sleep(5);
    } else {
      break;
    }

    await heapifyBalls(unsortedNumbers, 0, i - 1, balls);
  }

  for (let i = 0; i < unsortedNumbers.length; i++) {
    visualizePutItIn(
      unsortedNumbers,
      i,
      i * w + w / 2,
      scene.clientHeight / 2,
      balls
    );
  }

  console.log('Done');
};

const heapifyBalls = async (
  unsortedNumbers: number[],
  index: number,
  end: number,
  balls: BallModel[]
) => {
  let i = index;

  while (true) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let child;

    if (left > end && right > end) {
      return;
    } else if (unsortedNumbers[left] > unsortedNumbers[right] || right > end) {
      child = left;
    } else {
      child = right;
    }

    if (unsortedNumbers[i] < unsortedNumbers[child]) {
      await visualizeSwap(unsortedNumbers, i, child, balls);
    }

    i = child;
  }
};

export const visualizeHeapSortWithBars = async (unsortedNumbers: number[]) => {
  let w: number = canvas.width / unsortedNumbers.length;

  ms = Math.floor(w);

  for (var i = unsortedNumbers.length - 1; i >= 0; i--) {
    await heapifyBars(unsortedNumbers, i, unsortedNumbers.length - 1);

    if (i < unsortedNumbers.length - 1) {
      colorCodes[i + 1] = 1;
    }
    colorCodes[i] = 2;

    drawBars(unsortedNumbers, colorCodes);
  }

  for (var i = unsortedNumbers.length - 1; i >= 0; i--) {
    colorCodes[0] = 1;
    colorCodes[i] = 2;
    swap(unsortedNumbers, 0, i);

    await sleep(ms);

    colorCodes[i] = 0;
    colorCodes[0] = 2;
    drawBars(unsortedNumbers, colorCodes);

    await heapifyBars(unsortedNumbers, 0, i - 1);
  }

  colorCodes[0] = 0;
  drawBars(unsortedNumbers, colorCodes);

  console.log('Done');
};

const heapifyBars = async (
  unsortedNumbers: number[],
  index: number,
  end: number
) => {
  var i = index;

  while (true) {
    var left = 2 * i + 1,
      right = 2 * i + 2,
      child;

    if (left > end && right > end) {
      return;
    } else if (unsortedNumbers[left] > unsortedNumbers[right] || right > end) {
      child = left;
    } else {
      child = right;
    }

    if (unsortedNumbers[i] < unsortedNumbers[child]) {
      swap(unsortedNumbers, i, child);
      await sleep(2 * ms);
    }

    i = child;
  }
};
