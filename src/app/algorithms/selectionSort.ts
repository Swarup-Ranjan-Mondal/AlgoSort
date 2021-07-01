import BallModel from '../models/BallModel';
import { visualizeSwap } from '../utils/ballUtils';
import { colors, visualizeBarsSwap } from '../utils/barUtils';
import { map, sleep } from '../utils/essentials';
import BarModel from '../models/BarModel';

let length: number;
let ms: number;

export const visualizeSelectionSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  length = unsortedNumbers.length;

  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < length; j++) {
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
  unsortedNumbers: number[],
  bars: BarModel[]
) => {
  length = unsortedNumbers.length;
  ms = Math.floor(map(length, 2, 120, 2700, 1000) / length);

  for (let i = 0; i < length - 1; i++) {
    bars[i].color = colors[5];

    let minIndex = i;

    for (let j = i + 1; j < length; j++) {
      bars[j].color = colors[1];
      await sleep(Math.floor(0.55 * ms));

      if (unsortedNumbers[j] < unsortedNumbers[minIndex]) {
        if (minIndex !== i) {
          /* Remove the color of the bar at previous min-index */
          bars[minIndex].color = colors[0];
        }

        minIndex = j;
      } else {
        bars[j].color = colors[3];
        await sleep(Math.floor(0.65 * ms));
      }

      bars[j].color = colors[0];
      bars[minIndex].color = colors[5];
      await sleep(ms);
    }

    if (minIndex !== i) {
      await visualizeBarsSwap(
        unsortedNumbers,
        minIndex,
        i,
        bars,
        Math.floor(0.8 * ms)
      );
    }

    bars[minIndex].color = colors[3];
    bars[i].color = colors[3];
    await sleep(Math.floor(1.1 * ms));

    bars[minIndex].color = colors[0];
    bars[i].color = colors[4];
  }
  bars[length - 1].color = colors[4];

  console.log('Done');
};
