import { Component, OnDestroy, OnInit } from '@angular/core';

import { shuffle } from '@utils/array.util';

let nextId = 0;
interface Item {
  title: string;
  description: string;
  buttonText: string;
}
type Items = Item[];

@Component({
  selector: 'app-example-a',
  templateUrl: './example-a.component.html',
  styleUrls: ['./example-a.component.scss']
})

export class ExampleAComponent implements OnInit , OnDestroy{
  private descriptionGeneric = `quero viver o momento de agora como se ainda fosse cedo, como se nunca fosse tarde.`;
  private descriptionGenericWords: string[];

  items: Items = [];

  ngOnDestroy(){
    nextId = 0;
  }

  ngOnInit() {
    this.descriptionGenericWords = this.descriptionGeneric.split(' ');

    //iniciar com 4 items
    for (let i = 0; i < 4; i++) {
      this.addItem();
    }
  }

  addItem() {
    const id = ++nextId;
    this.items.push({
      title: `Grande ${id}`,
      description: shuffle(this.descriptionGenericWords)
        .join(' ')
        .toLowerCase(),
      buttonText: `simples ${id}`,
    });
  }
}
