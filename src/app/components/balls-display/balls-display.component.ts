import {
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

  ngOnInit(): void {
    this.changeminmax.emit({
      min: this.min,
      max: this.max,
    });
    this.sortingfunctioninit.emit(this.performTheSortingAlgorithms);
    walls = this.walls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      scene == undefined ||
      scene.clientWidth == 0 ||
      scene.clientHeight == 0
    ) {
      scene = <HTMLElement>document.querySelector('.scene');
    }

    if (changes.value && this.value >= this.min && this.value <= this.max) {
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

  performTheSortingAlgorithms = async () => {
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

    // this.sortingComplete = true;
    // setTimeout(() => {
    //   this.sortingComplete = false;
    // }, 3000);
  };
}
