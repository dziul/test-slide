import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideComponent } from './components/slide/slide.component';
import { SlideItemDirective } from './components/slide/slide-item.directive';

const components = [SlideComponent];
const directives = [SlideItemDirective];

@NgModule({
  declarations: [...components, ...directives],
  exports: [...components, ...directives],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
