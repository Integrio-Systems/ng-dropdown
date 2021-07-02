import {Component} from '@angular/core';

@Component({
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss']
})
export class BigDataComponent {
  public items = Array(5000).fill(0).map((_, i) => i + 1);
}
