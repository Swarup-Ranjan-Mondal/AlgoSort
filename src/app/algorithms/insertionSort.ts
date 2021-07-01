import { scene } from '../components/balls-display/balls-display.component';
import BallModel from '../models/BallModel';
import { visualizePutItAside, visualizePutItIn } from '../utils/ballUtils';
import { colors, visualizeBarsSwap } from '../utils/barUtils';
import { map, sleep } from '../utils/essentials';
import BarModel from '../models/BarModel';

let length: number;
let ms: number;

export const visualizeInsertionSortWithBalls = async (
  unsortedNumbers: number[],
  balls: BallModel[]
) => {
  length = unsortedNumbers.length;
  const w = scene.clientWidth / length;

  for (let i = 1; i < length; i++) {
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
  unsortedNumbers: number[],
  bars: BarModel[]
) => {
  length = unsortedNumbers.length;
  ms = Math.floor(map(length, 2, 120, 2800, 1000) / length);

  for (var i = 1; i < length; i++) {
    let j = i;

    while (j > 0) {
      bars[j - 1].color = colors[1];
      bars[j].color = colors[1];
      await sleep(ms);

      if (unsortedNumbers[j - 1] > unsortedNumbers[j]) {
        await visualizeBarsSwap(
          unsortedNumbers,
          j - 1,
          j,
          bars,
          Math.floor(0.8 * ms)
        );
      }

      bars[j - 1].color = colors[3];
      bars[j].color = colors[3];
      await sleep(Math.floor(1.1 * ms));

      bars[j - 1].color = colors[0];
      bars[j].color = i !== length - 1 ? colors[0] : colors[4];

      j--;
    }
  }
  bars[0].color = colors[4];

  console.log('Done');
};
