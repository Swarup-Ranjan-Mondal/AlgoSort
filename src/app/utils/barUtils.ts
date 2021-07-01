import BarModel from '../models/BarModel';
import { sleep } from './essentials';

export const colors: string[] = [
  'rgba(63, 72, 235, 0.7)',
  'rgba(255, 157, 46, 0.7)',
  'rgba(223, 20, 10, 0.7)',
  'rgba(45, 223, 123, 0.7)',
  'rgba(0, 193, 197, 0.7)',
  'rgba(1, 106, 77, 0.7)',
];

export const visualizeBarsSwap = async (
  array: number[],
  i: number,
  j: number,
  bars: BarModel[],
  waitingTime: number
) => {
  bars[i].color = colors[2];
  bars[j].color = colors[2];
  await sleep(waitingTime);

  [array[i], array[j]] = [array[j], array[i]];
  [bars[i], bars[j]] = [bars[j], bars[i]];
  await sleep(waitingTime);
};
