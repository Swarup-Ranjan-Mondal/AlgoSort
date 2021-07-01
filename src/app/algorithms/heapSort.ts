import { scene } from '../components/balls-display/balls-display.component';
import BallModel from '../models/BallModel';
import {
  visualizePutItAside,
  visualizePutItIn,
  visualizeRelocate,
  visualizeSwap,
} from '../utils/ballUtils';
import { colors, visualizeBarsSwap } from '../utils/barUtils';
import { map, sleep } from '../utils/essentials';
import BarModel from '../models/BarModel';

let length: number;
let ms: number;

export const visualizeHeapSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  length = unsortedNumbers.length;
  const w = scene.clientWidth / length;

  for (let i = length - 1; i >= 0; i--) {
    await heapifyBalls(unsortedNumbers, i, length - 1, balls);
  }

  for (let i = length - 1; i >= 0; i--) {
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

  for (let i = 0; i < length; i++) {
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

export const visualizeHeapSortWithBars = async (
  unsortedNumbers: number[],
  bars: BarModel[]
) => {
  length = unsortedNumbers.length;
  ms = Math.floor(map(length, 2, 120, 2700, 1500) / length);

  for (let i = length - 1; i >= 0; i--) {
    await heapifyBars(unsortedNumbers, i, length - 1, bars);
  }

  for (let i = length - 1; i > 0; i--) {
    bars[0].color = colors[1];
    bars[i].color = colors[1];
    await sleep(ms);

    await visualizeBarsSwap(unsortedNumbers, 0, i, bars, Math.floor(0.8 * ms));

    bars[0].color = colors[3];
    bars[i].color = colors[3];
    await sleep(Math.floor(1.1 * ms));

    bars[0].color = colors[0];
    bars[i].color = colors[4];

    await heapifyBars(unsortedNumbers, 0, i - 1, bars);
  }
  bars[0].color = colors[4];

  console.log('Done');
};

const heapifyBars = async (
  unsortedNumbers: number[],
  index: number,
  end: number,
  bars: BarModel[]
) => {
  let parent = index;

  while (true) {
    let left = 2 * parent + 1;
    let right = 2 * parent + 2;
    let child;

    if (left > end && right > end) {
      return;
    }

    bars[parent].color = colors[5];
    bars[left].color = colors[5];
    if (right < end) {
      bars[right].color = colors[5];
    }
    await sleep(Math.floor(1.3 * ms));

    if (unsortedNumbers[left] > unsortedNumbers[right] || right > end) {
      child = left;
    } else {
      child = right;
    }

    bars[parent].color = colors[1];
    bars[child].color = colors[1];
    await sleep(ms);

    if (unsortedNumbers[parent] < unsortedNumbers[child]) {
      await visualizeBarsSwap(
        unsortedNumbers,
        parent,
        child,
        bars,
        Math.floor(0.8 * ms)
      );
    }

    bars[parent].color = colors[3];
    bars[child].color = colors[3];
    await sleep(Math.floor(1.1 * ms));

    bars[parent].color = colors[5];
    bars[left].color = colors[5];
    if (right < end) {
      bars[right].color = colors[5];
    }
    await sleep(Math.floor(1.3 * ms));

    bars[parent].color = colors[0];
    bars[left].color = colors[0];
    if (right < end) {
      bars[right].color = colors[0];
    }

    parent = child;
  }
};
