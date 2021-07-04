import { ChangeDetectorRef } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { visualizeBubbleSortWithBars } from 'src/app/algorithms/bubbleSort';
import { visualizeHeapSortWithBars } from 'src/app/algorithms/heapSort';
import { visualizeInsertionSortWithBars } from 'src/app/algorithms/insertionSort';
import { visualiseMergeSortWithBars } from 'src/app/algorithms/mergeSort';
import { visualiseQuickSortWithBars } from 'src/app/algorithms/quickSort';
import { visualiseSelectionSortWithBars } from 'src/app/algorithms/selectionSort';
import BarModel from 'src/app/models/BarModel';
import { colors } from 'src/app/utils/barUtils';
import { generateRandomizedArray } from 'src/app/utils/essentials';

let rangeMax: number;
let conditionalSetMax: (max: number) => void;

@Component({
  selector: 'bars-display',
  templateUrl: './bars-display.component.html',
  styleUrls: ['./bars-display.component.scss'],
})
export class BarsDisplayComponent implements OnInit {
  @Input() value!: number;
  @Input() sortingType!: string;

  @Output() changeminmax = new EventEmitter<any>();
  @Output() randomizefunctioninit = new EventEmitter<() => void>();
  @Output() sortingfunctioninit = new EventEmitter<() => Promise<void>>();

  min: number = 2;
  max: number = 120;
  array: number[] = [];
  bars: BarModel[] = [];

  displaySection!: HTMLElement;
  sceneWidth!: number;

  resizeObserver: ResizeObserver = new ResizeObserver(function (
    entries: ResizeObserverEntry[]
  ) {
    /* Since we are observing only a single element, 
      so we access the first element in entries array */

    const element = entries[0].contentRect;

    /* Depending on the screen size, the max value of the slider changes 
    to make sure the visible portion only displays that much contents as much 
    it can fit. */

    const minValue = 25;
    const maxValue = 120;
    const maxToBeSet = Math.round(
      minValue + ((element.width - 320) * (maxValue - minValue)) / (1480 - 320)
    );
    conditionalSetMax(maxToBeSet);
  });

  constructor(private cd: ChangeDetectorRef) {
    this.displaySection = <HTMLElement>(
      document.querySelector('.display-section')
    );
    conditionalSetMax = (max: number) => {
      this.resizeTheBars();
      this.cd.detectChanges();

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

    this.resizeObserver.observe(this.displaySection);
    this.changeminmax.emit({
      min: this.min,
      max: this.max,
    });
    this.randomizefunctioninit.emit(this.generateNewRandomizedArray);
    this.sortingfunctioninit.emit(this.performTheSortingAlgorithm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value >= this.min && this.value <= this.max) {
      /* Whenever there is change in the value of the slider, an 
      array of unsorted numbers is generated and they are visually 
      represened as bars on the screen. */

      rangeMax = Math.floor((this.value + 6) * 1.5);
      this.array = generateRandomizedArray(this.value, 6, rangeMax);
      this.showArrayElementsAsBars();
    }
  }

  showArrayElementsAsBars(): void {
    const length = this.array.length;
    const [barWidth, hp, gap] = this.getBarsProperties(length);

    this.bars = [];
    this.sceneWidth = barWidth * length + gap * (length + 1);
    this.array.forEach((number) => {
      this.bars.push({
        value: number,
        width: barWidth,
        height: hp * number,
        color: colors[0],
      });
    });
  }

  resizeTheBars(): void {
    /* Resizing the bars, whenever the dimensions of the display 
    screen changes. */

    const length = this.bars.length;
    const [barWidth, hp, gap] = this.getBarsProperties(length);

    this.sceneWidth = barWidth * length + gap * (length + 1);
    for (let i = 0; i < length; i++) {
      this.bars[i].width = barWidth;
      this.bars[i].height = hp * this.bars[i].value;
    }
  }

  getBarsProperties(
    barsNumber: number
  ): [barWidth: number, hp: number, gap: number] {
    /* Returns the properties of the bars i.e. bar width, height 
    proportion (hp) and gap between the bars. */

    const gap = ((barsNumber: number) => {
      const minGapValue = 4;
      const maxGapValue = 20;
      const gapValue =
        minGapValue +
        ((maxGapValue - minGapValue) * (this.max - barsNumber) * this.min) /
          ((this.max - this.min) * barsNumber);

      return Math.round(gapValue * 10) / 10;
    })(barsNumber);

    const availableWidth =
      this.displaySection.clientWidth * 0.9 - gap * (barsNumber + 1);
    const barWidth =
      barsNumber > 12 ? availableWidth / barsNumber : availableWidth / 12;
    const hp = (this.displaySection.clientHeight * 0.9 - 20) / rangeMax;

    return [barWidth, hp, gap];
  }

  generateNewRandomizedArray = () => {
    this.array = generateRandomizedArray(this.value, 6, rangeMax);
    this.showArrayElementsAsBars();
  };

  performTheSortingAlgorithm = async () => {
    for (let i = 0; i < this.bars.length; i++) {
      this.bars[i].color = colors[0];
    }

    if (this.sortingType.includes('bubble')) {
      await visualizeBubbleSortWithBars(this.array, this.bars);
    } else if (this.sortingType.includes('heap')) {
      await visualizeHeapSortWithBars(this.array, this.bars);
    } else if (this.sortingType.includes('insertion')) {
      await visualizeInsertionSortWithBars(this.array, this.bars);
    } else if (this.sortingType.includes('merge')) {
      await visualiseMergeSortWithBars(this.array, this.bars);
    } else if (this.sortingType.includes('quick')) {
      await visualiseQuickSortWithBars(this.array, this.bars);
    } else if (this.sortingType.includes('selection')) {
      await visualiseSelectionSortWithBars(this.array, this.bars);
    }
  };
}
