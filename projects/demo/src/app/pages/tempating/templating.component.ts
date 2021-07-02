import {Component} from '@angular/core';
import {items1000} from '../../data';

@Component({
  templateUrl: './templating.component.html',
  styleUrls: ['./templating.component.scss']
})
export class TemplatingComponent {
  public items = items1000;
  public loading = false;

  public items2 = [...items1000];
  public selected = [];

  public remove(record: any): void {
    this.items2 = this.items2.filter(r => r !== record);
    this.selected = this.selected.filter(r => r !== record);
  }
}
