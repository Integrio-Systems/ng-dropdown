import {Component} from '@angular/core';
import {items1000} from '../../data';

@Component({
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent {
  public items = items1000;
  public closeAfterSelect = false;
  public selected = [3, 7, 9];
}
