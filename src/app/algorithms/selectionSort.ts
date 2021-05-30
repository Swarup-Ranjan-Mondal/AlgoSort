import {
  canvas,
  colorCodes,
} from '../components/bars-display/bars-display.component';
import BallModel from '../models/BallModel';
import { visualizeSwap } from '../utils/sceneUtils';
import { drawBars, swap } from '../utils/canvasUtils';
import { sleep } from '../utils/essentials';

let ms: number;

export const visualizeSelectionSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  for (let i = 0; i < unsortedNumbers.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < unsortedNumbers.length; j++) {
      await sleep(2);

      if (unsortedNumbers[j] < unsortedNumbers[minIndex]) {
        minIndex = j;
      }
    }

    await visualizeSwap(unsortedNumbers, i, minIndex, balls);
  }

  console.log('Done');
};
export const visualiseSelectionSortWithBars = async (
  unsortedNumbers: number[]
) => {
  ms = Math.floor(canvas.width / unsortedNumbers.length);

  for (var i = 0; i < unsortedNumbers.length; i++) {
    colorCodes[i] = 1;
  }
  drawBars(unsortedNumbers, colorCodes);

  for (var i = 0; i < unsortedNumbers.length - 1; i++) {
    var minIndex = i;
    colorCodes[i] = 2;
    drawBars(unsortedNumbers, colorCodes);

    for (var j = i + 1; j < unsortedNumbers.length; j++) {
      await sleep(ms / 2);

      if (unsortedNumbers[j] < unsortedNumbers[minIndex]) {
        colorCodes[minIndex] = 1;
        colorCodes[j] = 2;
        drawBars(unsortedNumbers, colorCodes);

        minIndex = j;
      }
    }

    colorCodes[minIndex] = 1;
    colorCodes[i] = 2;
    swap(unsortedNumbers, i, minIndex);
    await sleep(ms / 2);
    colorCodes[i] = 0;
    drawBars(unsortedNumbers, colorCodes);
  }

  colorCodes[unsortedNumbers.length - 1] = 0;
  drawBars(unsortedNumbers, colorCodes);

  console.log('Done');
};
