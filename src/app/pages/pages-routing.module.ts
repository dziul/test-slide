import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleAComponent } from './example-a/example-a.component';
import { ExampleBComponent } from './example-b/example-b.component';

export const routes: Routes = [
  {
    path: 'example-a',
    component: ExampleAComponent
  },
  {
    path: 'example-b',
    component: ExampleBComponent
  },
  {
    path: '**',
    redirectTo: '/example-a',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
