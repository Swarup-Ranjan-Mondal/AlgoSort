import {
  scene,
  walls,
} from '../components/balls-display/balls-display.component';
import BallModel from '../models/BallModel';
import { sleep } from './essentials';

export const drawPartitionWall = (size: number, i: number) => {
  if (i >= size - 1) {
    return;
  }

  const w = scene.clientWidth / size;
  walls.push({
    centerX: (i + 1) * w,
    centerY: scene.clientHeight / 2,
  });
};

export const removePartitionWall = (size: number, i: number) => {
  if (walls.length == 0) {
    return;
  }

  const w = scene.clientWidth / size;
  let pos = size;
  walls.forEach((wall, index) => {
    if (wall.centerX == (i + 1) * w) {
      pos = index;
      return;
    }
  });

  if (pos == size) {
    return;
  } else {
    walls.splice(pos, 1);
  }
};

export const visualizeSwap = async (
  array: number[],
  i: number,
  j: number,
  balls: BallModel[]
) => {
  if (i === j) {
    return;
  } else if (i > j) {
    [i, j] = [j, i];
  }

  const w = scene.clientWidth / array.length;
  const midX = (i + j + 1) * w * 0.5;
  const midY = scene.clientHeight / 2;

  let x = (i + 0.5) * w - midX;
  const a = Math.abs(x);
  const b = 0.6 * a;
  let y = b * Math.sqrt(1 - Math.pow(x / a, 2));

  while (x + 1 <= a) {
    if (Math.floor(x) % 5 == 0) {
      await sleep(Math.floor(8 / (i - j)));
    }

    balls[i] = {
      ...balls[i],
      centerX: midX + x,
      centerY: midY - y,
    };
    balls[j] = {
      ...balls[j],
      centerX: midX - x,
      centerY: midY + y,
    };

    x++;
    y = b * Math.sqrt(1 - Math.pow(x / a, 2));
  }

  [array[i], array[j]] = [array[j], array[i]];

  balls[i] = {
    ...balls[i],
    centerX: midX - a,
    centerY: midY,
    radius: array[i],
  };
  balls[j] = {
    ...balls[j],
    centerX: midX + a,
    centerY: midY,
    radius: array[j],
  };
};

export const visualizeRelocate = async (
  array: number[],
  i: number,
  j: number,
  balls: BallModel[]
) => {
  if (i === j) {
    return;
  }

  const w = scene.clientWidth / array.length;
  const midX = (i + j + 1) * w * 0.5;
  const midY = scene.clientHeight / 2;

  let x = (i + 0.5) * w - midX;
  const a = Math.abs(x);
  const b = 0.6 * a;
  const dirX = x / a;
  let y = 0;

  while (-dirX * (x - dirX) <= a) {
    if (Math.floor(x) % 5 == 0) {
      await sleep(Math.floor(8 / (i - j)));
    }

    balls[i] = {
      ...balls[i],
      centerX: midX + x,
      centerY: midY - y,
    };

    x = x - dirX;
    y = b * Math.sqrt(1 - Math.pow(x / a, 2));
  }

  balls[i] = {
    ...balls[i],
    centerX: midX - dirX * a,
    centerY: midY,
    radius: array[i],
  };
};

export const visualizePutItAside = async (
  array: number[],
  i: number,
  midX: number,
  midY: number,
  balls: BallModel[]
) => {
  const ithBall = document.querySelector(`#ball-${i + 1}`) as HTMLElement;
  const w = scene.clientWidth / array.length;

  let x = (i + 0.5) * w - midX;
  const a = Math.abs(x);
  const b = midY - ithBall.clientHeight / 2;
  const dirX = x != 0 ? x / a : 1;
  let y = 0;

  while (y + 1 < b) {
    if (y % 3 == 0) {
      await sleep(0);
    }

    x = dirX * a * Math.sqrt(1 - Math.pow(++y / b, 2));

    balls[i] = {
      ...balls[i],
      centerX: midX + x,
      centerY: midY + y,
    };
  }

  balls[i] = {
    ...balls[i],
    centerX: midX,
    centerY: midY + b,
  };
};

export const visualizePutItIn = async (
  array: number[],
  i: number,
  midX: number,
  midY: number,
  balls: BallModel[]
) => {
  const ithBall = document.querySelector(`#ball-${i + 1}`) as HTMLElement;
  const w = scene.clientWidth / array.length;

  let x = (i + 0.5) * w - midX;
  const a = Math.abs(x);
  const b = midY - ithBall.clientHeight / 2;
  const dirX = x != 0 ? x / a : 1;
  let y = b;

  while (y > 0) {
    if (Math.floor(y) % 3 == 0) {
      await sleep(10);
    }
    x = dirX * a * Math.sqrt(1 - Math.pow(y-- / b, 2));

    balls[i] = {
      ...balls[i],
      centerX: midX + x,
      centerY: midY + y,
    };
  }

  balls[i] = {
    ...balls[i],
    centerX: midX + dirX * a,
    centerY: midY,
  };
};
