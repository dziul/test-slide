import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SlideItemDirective } from './slide-item.directive';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent
  implements OnInit, AfterContentInit, AfterViewInit, DoCheck {
  @ContentChildren(SlideItemDirective)
  slideItems: QueryList<SlideItemDirective>;

  @ViewChild('slideListRef') slideListRef: ElementRef<HTMLElement>;

  slides: SlideItemDirective[] = [];

  slideItem = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.addSlideItem();
    this.slideItems.changes.subscribe(() => {
      this.removeSlideChildren();
      this.addSlideItem();
    });
  }

  ngDoCheck() {}

  ngAfterContentInit() {
    if (!this.slideItems.length) {
      console.error('Not found element(s) with directive "slideItem"');
    }
  }

  onSwipeLeft() {
    console.log('swipe left');
  }
  onSwipeRight() {
    console.log('swipe right');
  }

  private addSlideItem() {
    this.slideItems.forEach((item, index) => {
      const liElement = this.renderer.createElement('li') as HTMLElement;
      const contentElement = this.renderer.createElement('div') as HTMLElement;

      this.renderer.appendChild(contentElement, item.hostRef.nativeElement);
      this.renderer.addClass(contentElement, 'slide-item-content');

      this.renderer.addClass(liElement, 'slide-item');
      this.renderer.setAttribute(liElement, 'tabindex', '-1');
      this.renderer.listen(liElement, 'focusin', () => {
        console.log('item ' + index, liElement.getBoundingClientRect().left);

        this.slideItem = index;
      });

      this.renderer.appendChild(liElement, contentElement);

      this.renderer.appendChild(this.slideListRef.nativeElement, liElement);
    });
  }

  private removeSlideChildren() {
    Array.from(this.slideListRef.nativeElement.children).forEach((child) => {
      this.renderer.removeChild(this.slideListRef.nativeElement, child);
    });
  }

  // https://stackoverflow.com/a/44511007/4100275
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY,
    ];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [
        coord[0] - this.swipeCoord[0],
        coord[1] - this.swipeCoord[1],
      ];
      const duration = time - this.swipeTime;

      if (
        duration < 1000 && //
        Math.abs(direction[0]) > 30 && // Long enough
        Math.abs(direction[0]) > Math.abs(direction[1] * 3)
      ) {
        // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        console.log(swipe, this.slideItem + 1);
        // Do whatever you want with swipe
      }
    }
  }
}
