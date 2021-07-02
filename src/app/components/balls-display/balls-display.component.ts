import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import BallModel from 'src/app/models/BallModel';
import WallModel from 'src/app/models/WallModel';
import { visualizeBubbleSortWithBalls } from 'src/app/algorithms/bubbleSort';
import { visualizeHeapSortWithBalls } from 'src/app/algorithms/heapSort';
import { visualizeInsertionSortWithBalls } from 'src/app/algorithms/insertionSort';
import { visualizeMergeSortWithBalls } from 'src/app/algorithms/mergeSort';
import { visualizeQuickSortWithBalls } from 'src/app/algorithms/quickSort';
import { visualizeSelectionSortWithBalls } from 'src/app/algorithms/selectionSort';
import { generateUnsortedNumbers } from 'src/app/utils/essentials';

export let scene: HTMLElement;
export let walls: WallModel[];

let scaleBalls: (scaleX: number, scaleY: number) => void;
let conditionalSetMax: (max: number) => void;

@Component({
  selector: 'app-balls-display',
  templateUrl: './balls-display.component.html',
  styleUrls: ['./balls-display.component.scss'],
})
export class BallsDisplayComponent implements OnInit {
  @Input() value!: number;
  @Input() sortingType!: string;

  @Output() changeminmax = new EventEmitter<any>();
  @Output() sortingfunctioninit = new EventEmitter<() => Promise<void>>();

  min: number = 2;
  max: number = 15;
  unsortedNumbers: number[] = [];
  balls: BallModel[] = [];
  walls: WallModel[] = [];
  scaleX: number = 1;
  scaleY: number = 1;

  resizeObserver: ResizeObserver = new ResizeObserver(function (
    entries: ResizeObserverEntry[]
  ) {
    /* Since we are observing only a single element, 
      so we access the first element in entries array */

    const element = entries[0].contentRect;

    /* Depending on the screen size, the scene and the balls are scaled 
    to ensure the contents are displayed accurately. Also, the max value of 
    the slider changes to make sure the visible portion only displays that much 
    contents as much it can fit. */

    conditionalSetMax(Math.floor(element.width / 90));
    scene.style.transform = `scale(${element.width / scene.clientWidth}, ${
      element.height / scene.clientHeight
    })`;
    scaleBalls(
      scene.clientWidth / element.width,
      scene.clientHeight / element.height
    );
  });

  constructor(private cd: ChangeDetectorRef) {
    scaleBalls = (scaleX: number, scaleY: number) => {
      this.scaleX = scaleX;
      this.scaleY = scaleY;
      this.cd.detectChanges();
    };
    conditionalSetMax = (max: number) => {
      if (max >= 2 && max != this.max) {
        this.max = max;
        this.changeminmax.emit({
          min: this.min,
          max: this.max,
        });
      }
    };
  }

  ngOnInit(): void {
    /* The display-section is setted as a resizeObserver so that 
    whenever there screen size changes, the display adjust itself 
    to show the contents properly. */

    this.resizeObserver.observe(
      <HTMLElement>document.querySelector('.display-section')
    );
    this.changeminmax.emit({
      min: this.min,
      max: this.max,
    });
    this.sortingfunctioninit.emit(this.performTheSortingAlgorithm);
    walls = this.walls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      scene === undefined ||
      scene.clientWidth === 0 ||
      scene.clientHeight === 0
    ) {
      scene = <HTMLElement>document.querySelector('.scene');
    }

    if (changes.value && this.value >= this.min && this.value <= this.max) {
      /* Whenever there is change in the value of the slider, an 
      array of unsorted numbers is generated and they are visually 
      represened as balls on the screen. */

      this.unsortedNumbers = generateUnsortedNumbers(this.value, 10, 30);
      this.showNumbersAsBalls();
    }
  }

  showNumbersAsBalls = () => {
    const w = scene.clientWidth / this.unsortedNumbers.length;

    this.balls = [];
    this.unsortedNumbers.forEach((number, index) => {
      this.balls.push({
        radius: number,
        centerX: (index + 0.5) * w,
        centerY: scene.clientHeight / 2,
      });
    });
  };

  performTheSortingAlgorithm = async () => {
    if (this.sortingType.includes('bubble')) {
      await visualizeBubbleSortWithBalls(this.unsortedNumbers, this.balls);
    } else if (this.sortingType.includes('heap')) {
      await visualizeHeapSortWithBalls(this.unsortedNumbers, this.balls);
    } else if (this.sortingType.includes('insertion')) {
      await visualizeInsertionSortWithBalls(this.unsortedNumbers, this.balls);
    } else if (this.sortingType.includes('merge')) {
      await visualizeMergeSortWithBalls(this.unsortedNumbers, this.balls);
    } else if (this.sortingType.includes('quick')) {
      await visualizeQuickSortWithBalls(this.unsortedNumbers, this.balls);
    } else if (this.sortingType.includes('selection')) {
      await visualizeSelectionSortWithBalls(this.unsortedNumbers, this.balls);
    }
  };
}
