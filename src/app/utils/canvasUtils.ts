import {
  canvas,
  colorCodes,
  ctx,
  max,
} from '../components/bars-display/bars-display.component';

export const color: string[] = [
  'rgb(136, 141, 236)',
  'rgb(101, 244, 255)',
  'rgb(233, 88, 129)',
];

export const drawBars = (unsortedNumbers: number[], colorCodes: number[]) => {
  const w =
    unsortedNumbers.length > 15
      ? canvas.width / unsortedNumbers.length
      : canvas.width / 15;
  const hp = (canvas.height * 0.75) / max;
  const margin = (canvas.width - w * unsortedNumbers.length) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < unsortedNumbers.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = color[colorCodes[i]];
    ctx.strokeStyle = 'rgb(24, 45, 53)';
    ctx.lineWidth = 1.5;
    ctx.rect(
      Math.round((i + 0.1) * w + margin),
      Math.round(canvas.height * 0.85 - hp * unsortedNumbers[i]),
      Math.round(w * 0.8),
      Math.round(hp * unsortedNumbers[i])
    );
    ctx.fill();
    ctx.stroke();

    if (unsortedNumbers.length <= 40) {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.font = '600 20px serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${unsortedNumbers[i]}`,
        Math.round((i + 0.5) * w + margin),
        Math.round(canvas.height * 0.85 + 20)
      );
    }
  }
};

export const swap = (array: number[], i: number, j: number) => {
  [array[i], array[j]] = [array[j], array[i]];
  drawBars(array, colorCodes);
};
