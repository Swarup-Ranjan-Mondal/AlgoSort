import { scene } from '../components/balls-display/balls-display.component';
import {
  canvas,
  colorCodes,
} from '../components/bars-display/bars-display.component';
import BallModel from '../models/BallModel';
import { visualizePutItAside, visualizePutItIn } from '../utils/sceneUtils';
import { drawBars } from '../utils/canvasUtils';
import { sleep } from '../utils/essentials';

let ms: number;

export const visualizeInsertionSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  const w = scene.clientWidth / unsortedNumbers.length;

  for (let i = 1; i < unsortedNumbers.length; i++) {
    let key = unsortedNumbers[i];
    let j = i - 1;

    await visualizePutItAside(
      unsortedNumbers,
      i,
      scene.clientWidth / 2,
      scene.clientHeight / 2,
      balls
    );
    await sleep(2);

    while (j >= 0 && unsortedNumbers[j] > key) {
      unsortedNumbers[j + 1] = unsortedNumbers[j];

      balls[j] = {
        ...balls[j],
        centerX: balls[j].centerX + w,
      };
      await sleep(20);

      [balls[j + 1], balls[j]] = [balls[j], balls[j + 1]];

      j--;
    }

    await visualizePutItIn(
      unsortedNumbers,
      j + 1,
      scene.clientWidth / 2,
      scene.clientHeight / 2,
      balls
    );

    unsortedNumbers[j + 1] = key;
  }

  console.log('Done');
};

export const visualizeInsertionSortWithBars = async (
  unsortedNumbers: number[]
) => {
  ms = Math.floor(canvas.width / unsortedNumbers.length);

  for (var i = 1; i < unsortedNumbers.length; i++) {
    let key = unsortedNumbers[i];
    let j = i - 1;

    colorCodes[i] = 2;
    drawBars(unsortedNumbers, colorCodes);

    await sleep(ms);

    while (j >= 0 && unsortedNumbers[j] > key) {
      unsortedNumbers[j + 1] = unsortedNumbers[j];

      colorCodes[j] = 1;
      drawBars(unsortedNumbers, colorCodes);

      await sleep(ms / 2);
      j--;
    }

    colorCodes[i] = 1;
    unsortedNumbers[j + 1] = key;
    colorCodes[j + 1] = 2;
    drawBars(unsortedNumbers, colorCodes);

    await sleep(3 * ms);
    for (j = 0; j < colorCodes.length; j++) {
      colorCodes[j] = 0;
    }
  }

  drawBars(unsortedNumbers, colorCodes);
  console.log('Done');
};
