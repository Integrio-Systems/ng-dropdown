import {Component} from '@angular/core';
import {items1000} from '../../data';

@Component({
  templateUrl: './filterable.component.html',
  styleUrls: ['./filterable.component.scss']
})
export class FilterableComponent {

  public items = items1000;
  public selected = Array(50).fill(0).map((_, i) => i + 10);

  public availableRecordsSearchTerm = '';
  public selectedRecordsSearchTerm = '';

  public filter = (record: number, pattern: string) => record % parseInt(pattern, 10) === 0;
}
