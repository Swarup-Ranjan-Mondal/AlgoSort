export const generateUnsortedNumbers = (
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
