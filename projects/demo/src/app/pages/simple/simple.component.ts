import {Component} from '@angular/core';
import {items1000} from '../../data';

@Component({
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {
  public items = items1000;
  public loading = false;
  public selected = 3;
  public disabled = false;
  public clearable = true;
}
