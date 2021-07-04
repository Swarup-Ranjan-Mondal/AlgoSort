export const generateRandomizedArray = (
  size: number,
  rangeFrom: number,
  rangeTo: number
) => {
  const array: number[] = [];
  const range: number = rangeTo - rangeFrom + 1;

  for (let i = 0; i < size; ) {
    let randNum = Math.floor(Math.random() * range + rangeFrom);

    if (!array.includes(randNum)) {
      array.push(randNum);
      i++;
    }
  }

  return array;
};

export const map = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) => {
  return start2 + ((stop2 - start2) * (value - start1)) / (stop1 - start1);
};

export const convertToWordCase = (string: string) => {
  let str = '';

  string.split(' ').forEach((word, index) => {
    if (index !== 0) {
      str += ' ';
    }
    str += word[0].toUpperCase() + word.substring(1);
  });

  return str;
};

export const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
