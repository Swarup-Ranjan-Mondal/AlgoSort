import {
  canvas,
  colorCodes,
} from '../components/bars-display/bars-display.component';
import BallModel from '../models/BallModel';
import { visualizeSwap } from '../utils/sceneUtils';
import { drawBars, swap } from '../utils/canvasUtils';
import { sleep } from '../utils/essentials';

let ms: number;

export const visualizeBubbleSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  for (let i = 0; i < unsortedNumbers.length - 1; i++) {
    for (let j = 0; j < unsortedNumbers.length - i - 1; j++) {
      await sleep(2);

      if (unsortedNumbers[j] > unsortedNumbers[j + 1]) {
        await visualizeSwap(unsortedNumbers, j, j + 1, balls);
      }
    }
  }

  console.log('Done');
};

export const visualizeBubbleSortWithBars = async (
  unsortedNumbers: number[]
) => {
  ms = Math.floor(canvas.width / unsortedNumbers.length);

  for (var i = 0; i < unsortedNumbers.length; i++) {
    colorCodes[i] = 1;
  }
  drawBars(unsortedNumbers, colorCodes);

  for (var i = 0; i < unsortedNumbers.length - 1; i++) {
    for (var j = 0; j < unsortedNumbers.length - i - 1; j++) {
      await sleep(ms);
      colorCodes[j] = 1;

      if (unsortedNumbers[j] > unsortedNumbers[j + 1]) {
        colorCodes[j + 1] = 2;
        swap(unsortedNumbers, j, j + 1);
      }
    }

    colorCodes[unsortedNumbers.length - i - 1] = 0;
    drawBars(unsortedNumbers, colorCodes);
  }

  colorCodes[0] = 0;
  drawBars(unsortedNumbers, colorCodes);
  console.log('Done');
};
