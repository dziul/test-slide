import { Component, OnInit } from '@angular/core';


import { routes as pagesRoutes } from './pages/pages-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  links: string[] = [];

  constructor(){}

  ngOnInit(){

    this.links = pagesRoutes.map(route => route.path).filter(path=> !path.includes('*'));


  }

}
