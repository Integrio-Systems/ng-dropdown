import {Component} from '@angular/core';

@Component({
  templateUrl: './grouped.component.html',
  styleUrls: ['./grouped.component.scss']
})
export class GroupedComponent {

  public singleGroupItems = [
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

  public multiGroupItems = [
    {
      value: 'Node.js',
      tags: ['Web', 'Server']
    },
    {
      value: 'Angular',
      tags: ['Web', 'Client']
    },
    {
      value: 'React',
      tags: ['Web', 'Client']
    },
    {
      value: 'Asp.net',
      tags: ['Web', 'Server']
    },
    {
      value: 'ObjectiveC',
      tags: ['Desktop']
    }
  ];

}
