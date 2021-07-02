import {Component} from '@angular/core';

@Component({
  templateUrl: './grouped.component.html',
  styleUrls: ['./grouped.component.scss']
})
export class GroupedComponent {

  public ungroupedItems = [
    {
      type: 'Veg',
      value: '🍄'
    },
    {
      type: 'Fruit',
      value: '🥝'
    },
    {
      type: 'Veg',
      value: '🧅'
    },
    {
      type: 'Fruit',
      value: '🍓'
    },
    {
      type: 'Veg',
      value: '🥕'
    },
    {
      type: 'Fruit',
      value: '🍇'
    },
  ];

}
