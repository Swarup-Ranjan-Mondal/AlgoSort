import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  options = ['Ball', 'Bar'];
  unsortedNumbers: number[] = [];
  scene = document.createElement('div') as HTMLElement;

  constructor() {
    this.unsortedNumbers = this.generateUnsortedArray(10, 10, 30);
    console.log(this.unsortedNumbers);
  }

  ngAfterViewInit(): void {
    this.scene = document.querySelector('.scene') as HTMLElement;
    this.show(this.unsortedNumbers);

    // this.visualizeSelectionSort(this.unsortedNumbers);
    // this.visualizeBubbleSort(this.unsortedNumbers);
    // this.visualizeInsertionSort(this.unsortedNumbers);
    // this.visualizeMergeSort(this.unsortedNumbers);
    // this.visualizeQuickSort(this.unsortedNumbers);
  }

  generateUnsortedArray = (
    size: number,
    rangeFrom: number,
    rangeTo: number
  ) => {
    const array: number[] = [];
    const range: number = rangeTo - rangeFrom + 1;

    for (var i = 0; i < size; ) {
      var randNum = Math.floor(Math.random() * range + rangeFrom);

      if (!array.includes(randNum)) {
        array.push(randNum);
        i++;
      }
    }

    return array;
  };

  show = (unsortedNumbers: number[]) => {
    const balls = Array.from(
      document.querySelectorAll('.ball')
    ) as HTMLElement[];

    balls.forEach((ball, index) => {
      const radius = unsortedNumbers[index];
      const w = this.scene.clientWidth / balls.length;

      ball.style.height = `calc((${radius}em * 2) / 30)`;
      ball.style.width = `calc((${radius}em * 2) / 30)`;
      ball.style.top = `${(this.scene.clientHeight - ball.clientHeight) / 2}px`;
      ball.style.left = `${index * w + (w - ball.clientWidth) / 2}px`;
    });
  };

  visualizeSwap = async (unsortedNumbers: number[], i: number, j: number) => {
    if (i === j) {
      return;
    } else if (i > j) {
      [i, j] = [j, i];
    }

    const ithBall = document.querySelector(`#ball-${i + 1}`) as HTMLElement;
    const jthBall = document.querySelector(`#ball-${j + 1}`) as HTMLElement;

    const w = this.scene.clientWidth / unsortedNumbers.length;
    const midX = (i + j + 1) * w * 0.5;
    const midY = this.scene.clientHeight / 2;
    var x = i * w + w / 2 - midX;
    const a = Math.abs(x);
    const b = 0.6 * a;
    var y = b * Math.sqrt(1 - Math.pow(x / a, 2));

    while (x + 1 <= a) {
      if (Math.floor(x) % 4 == 0) {
        await this.sleep(Math.floor(10 / (i - j)));
      }

      ithBall.style.left = `${midX + x - ithBall.clientWidth / 2}px`;
      ithBall.style.top = `${midY - y - ithBall.clientHeight / 2}px`;

      jthBall.style.left = `${midX - x - jthBall.clientWidth / 2}px`;
      jthBall.style.top = `${midY + y - jthBall.clientHeight / 2}px`;

      x++;
      y = b * Math.sqrt(1 - Math.pow(x / a, 2));
    }

    /* Placing the pair of balls to exact position 
    as after swapping their position is slight shifted */
    ithBall.style.left = `${midX + a - ithBall.clientWidth / 2}px`;
    ithBall.style.top = `${midY - ithBall.clientHeight / 2}px`;

    jthBall.style.left = `${midX - a - jthBall.clientWidth / 2}px`;
    jthBall.style.top = `${midY - jthBall.clientHeight / 2}px`;

    /* Changing the contents of the array cause the balls to re-render */
    [unsortedNumbers[i], unsortedNumbers[j]] = [
      unsortedNumbers[j],
      unsortedNumbers[i],
    ];

    /* Giving the balls a little time to re-render after swapping 
    the two numbers in the array */
    await this.sleep(1);
  };

  visualizePutItAside = async (
    unsortedNumbers: number[],
    i: number,
    midX: number,
    midY: number
  ) => {
    const ithBall = document.querySelector(`#ball-${i + 1}`) as HTMLElement;

    const w = this.scene.clientWidth / unsortedNumbers.length;
    var x = i * w + w / 2 - midX;
    const a = Math.abs(x);
    const b = midY - ithBall.clientHeight / 2;
    const dirX = x != 0 ? x / a : 1;
    var y = 0;

    while (y < b) {
      if (y % 3 == 0) {
        await this.sleep(0);
      }

      x = dirX * a * Math.sqrt(1 - Math.pow(++y / b, 2));

      ithBall.style.left = `${midX + x - ithBall.clientWidth / 2}px`;
      ithBall.style.top = `${midY + y - ithBall.clientHeight / 2}px`;
    }

    ithBall.style.left = `${midX - ithBall.clientWidth / 2}px`;
    ithBall.style.top = `${midY + b - ithBall.clientHeight / 2}px`;
  };

  visualizePutItIn = async (
    unsortedNumbers: number[],
    i: number,
    midX: number,
    midY: number
  ) => {
    const ithBall = document.querySelector(`#ball-${i + 1}`) as HTMLElement;

    const w = this.scene.clientWidth / unsortedNumbers.length;
    var x = i * w + w / 2 - midX;
    const a = Math.abs(x);
    const b = midY - ithBall.clientHeight / 2;
    const dirX = x != 0 ? x / a : 1;
    var y = b;

    while (y > 0) {
      if (Math.floor(y) % 2 == 0) {
        await this.sleep(10);
      }
      x = dirX * a * Math.sqrt(1 - Math.pow(y-- / b, 2));

      ithBall.style.left = `${midX + x - ithBall.clientWidth / 2}px`;
      ithBall.style.top = `${midY + y - ithBall.clientHeight / 2}px`;
    }

    ithBall.style.left = `${midX + dirX * a - ithBall.clientWidth / 2}px`;
    ithBall.style.top = `${midY - ithBall.clientHeight / 2}px`;
  };

  visualizeSelectionSort = async (unsortedNumbers: number[]) => {
    for (var i = 0; i < unsortedNumbers.length - 1; i++) {
      var minIndex = i;

      for (var j = i + 1; j < unsortedNumbers.length; j++) {
        await this.sleep(2);

        if (unsortedNumbers[j] < unsortedNumbers[minIndex]) {
          minIndex = j;
        }
      }

      await this.visualizeSwap(unsortedNumbers, i, minIndex);
    }

    console.log('Done');
  };

  visualizeBubbleSort = async (unsortedNumbers: number[]) => {
    for (var i = 0; i < unsortedNumbers.length - 1; i++) {
      for (var j = 0; j < unsortedNumbers.length - i - 1; j++) {
        await this.sleep(2);

        if (unsortedNumbers[j] > unsortedNumbers[j + 1]) {
          await this.visualizeSwap(unsortedNumbers, j, j + 1);
        }
      }
    }

    console.log('Done');
  };

  visualizeInsertionSort = async (unsortedNumbers: number[]) => {
    const w = this.scene.clientWidth / unsortedNumbers.length;

    for (var i = 1; i < unsortedNumbers.length; i++) {
      var key = unsortedNumbers[i];
      var j = i - 1;

      await this.visualizePutItAside(
        unsortedNumbers,
        i,
        this.scene.clientWidth / 2,
        this.scene.clientHeight / 2
      );
      await this.sleep(2);

      var temp = Array.from(unsortedNumbers);
      while (j >= 0 && temp[j] > key) {
        /* Modifying the content of the array will trigger the balls to re-render 
        so temporay array is used */
        temp[j + 1] = temp[j];

        const jthElement = document.querySelector(
          `#ball-${j + 1}`
        ) as HTMLElement;
        const nextJthElement = document.querySelector(
          `#ball-${j + 2}`
        ) as HTMLElement;

        jthElement.style.left = `${
          (j + 1) * w + (w - jthElement.clientWidth) / 2
        }px`;
        jthElement.style.top = `${
          (this.scene.clientWidth - jthElement.clientHeight) / 2
        }`;
        [jthElement.id, nextJthElement.id] = [nextJthElement.id, jthElement.id];

        await this.sleep(5);
        j--;
      }
      temp[j + 1] = key;

      await this.visualizePutItIn(
        unsortedNumbers,
        j + 1,
        this.scene.clientWidth / 2,
        this.scene.clientHeight / 2
      );

      for (var j = 0; j < temp.length; j++) {
        unsortedNumbers[j] = temp[j];
      }
    }

    console.log('Done');
  };

  visualizeMergeSort = async (unsortedNumbers: number[]) => {
    await this.mergeSortUtil(unsortedNumbers, 0, unsortedNumbers.length - 1);
    console.log('Done');
  };

  mergeSortUtil = async (
    unsortedNumbers: number[],
    low: number,
    high: number
  ) => {
    if (low < high) {
      var mid = Math.floor((low + high) / 2);
      // drawPartitionWall(unsortedNumbers.length, mid);
      await this.sleep(5);

      await this.mergeSortUtil(unsortedNumbers, low, mid);
      await this.mergeSortUtil(unsortedNumbers, mid + 1, high);

      // removePartitionWall(unsortedNumbers.length, mid);
      await this.sleep(5);

      await this.merge(unsortedNumbers, low, mid, high);
    }
  };

  merge = async (
    unsortedNumbers: number[],
    low: number,
    mid: number,
    high: number
  ) => {
    const A: number[] = [];
    const B: number[] = [];
    const C: number[] = [];

    for (var i = low; i <= mid; i++) {
      A.push(unsortedNumbers[i]);
    }

    for (var i = mid + 1; i <= high; i++) {
      B.push(unsortedNumbers[i]);
    }

    const w: number = this.scene.clientWidth / (high - low + 1);
    const elements: HTMLElement[] = [];

    var i = 0;
    var j = 0;

    for (var k = low; k <= high; k++) {
      if (i > A.length - 1) {
        C.push(B[j]);
        await this.visualizePutItAside(
          unsortedNumbers,
          mid + j + 1,
          (k - low) * w + w / 2,
          this.scene.clientHeight / 2
        );
        elements.push(
          document.querySelector(`#ball-${mid + j + 2}`) as HTMLElement
        );

        j++;
      } else if (j > B.length - 1) {
        C.push(A[i]);
        await this.visualizePutItAside(
          unsortedNumbers,
          low + i,
          (k - low) * w + w / 2,
          this.scene.clientHeight / 2
        );
        elements.push(
          document.querySelector(`#ball-${low + i + 1}`) as HTMLElement
        );

        i++;
      } else if (A[i] < B[j]) {
        C.push(A[i]);
        await this.visualizePutItAside(
          unsortedNumbers,
          low + i,
          (k - low) * w + w / 2,
          this.scene.clientHeight / 2
        );
        elements.push(
          document.querySelector(`#ball-${low + i + 1}`) as HTMLElement
        );

        i++;
      } else if (B[j] < A[i]) {
        C.push(B[j]);
        await this.visualizePutItAside(
          unsortedNumbers,
          mid + j + 1,
          (k - low) * w + w / 2,
          this.scene.clientHeight / 2
        );
        elements.push(
          document.querySelector(`#ball-${mid + j + 2}`) as HTMLElement
        );

        j++;
      } else if (A[i] == B[j]) {
        C.push(A[i]);
        await this.visualizePutItAside(
          unsortedNumbers,
          low + i,
          (k - low) * w + w / 2,
          this.scene.clientHeight / 2
        );
        elements.push(
          document.querySelector(`#ball-${low + i + 1}`) as HTMLElement
        );

        i++;
        k++;

        C.push(B[j]);
        await this.visualizePutItAside(
          unsortedNumbers,
          mid + j + 1,
          (k - low) * w + w / 2,
          this.scene.clientHeight / 2
        );
        elements.push(
          document.querySelector(`#ball-${mid + j + 2}`) as HTMLElement
        );

        j++;
      }
    }

    elements.forEach((element, index) => {
      element.id = `ball-${low + index + 1}`;
    });

    await this.sleep(5);

    for (var k = 0; k < C.length; k++) {
      if (C.length == unsortedNumbers.length) {
        this.visualizePutItIn(
          unsortedNumbers,
          low + k,
          k * w + w / 2,
          this.scene.clientHeight / 2
        );
      } else {
        await this.visualizePutItIn(
          unsortedNumbers,
          low + k,
          k * w + w / 2,
          this.scene.clientHeight / 2
        );
      }
    }

    C.forEach((number, index) => {
      unsortedNumbers[low + index] = number;
    });
  };

  visualizeQuickSort = async (unsortedNumbers: number[]) => {
    await this.quickSortUtil(unsortedNumbers, 0, unsortedNumbers.length - 1);
    console.log('Done');
  };

  quickSortUtil = async (
    unsortedNumbers: number[],
    low: number,
    high: number
  ) => {
    if (low < high) {
      var pi = await this.partition(unsortedNumbers, low, high);

      await this.quickSortUtil(unsortedNumbers, low, pi - 1);
      await this.quickSortUtil(unsortedNumbers, pi + 1, high);
    }
  };

  partition = async (unsortedNumbers: number[], low: number, high: number) => {
    if (low > 0) {
      // drawPartitionWall(unsortedNumbers.length, low - 1);
    }
    // drawPartitionWall(unsortedNumbers.length, high);

    var pivot = unsortedNumbers[high],
      index = low - 1;

    for (var i = low; i <= high - 1; i++) {
      if (unsortedNumbers[i] < pivot) {
        index++;

        await this.visualizeSwap(unsortedNumbers, i, index);
      }
    }

    await this.visualizeSwap(unsortedNumbers, high, index + 1);

    if (low > 0) {
      // removePartitionWall(unsortedNumbers.length, low - 1);
    }
    // removePartitionWall(unsortedNumbers.length, high);

    return index + 1;
  };

  sleep = async (ms: number) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  };
}
