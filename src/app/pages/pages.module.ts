import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleAComponent } from './example-a/example-a.component';
import { ExampleBComponent } from './example-b/example-b.component';
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [ExampleAComponent, ExampleBComponent],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
