import {Directive, Inject, Input, OnChanges} from '@angular/core';
import {FilterBy} from '../FilterBy';
import {SelectedRecordsHolderToken} from '../injectionTokens';
import {SimpleChanges} from '../SimpleChanges';
import {RecordsFilterDirectiveBase} from './RecordsFilterDirectiveBase';
import {FilterableRecords} from '../FilterableRecords';

@Directive({
  selector: '[selectedRecordsFilter]'
})
export class SelectedRecordsFilterDirective extends RecordsFilterDirectiveBase implements OnChanges {

  @Input()
  public filterSelectedBy?: FilterBy;

  @Input()
  public selectedRecordsSearchTerm?: string;

  constructor(
    @Inject(SelectedRecordsHolderToken) selectedRecords: FilterableRecords
  ) {
    super(selectedRecords);
  }

  public ngOnChanges(changes: SimpleChanges<SelectedRecordsFilterDirective>): void {
    this.updateFilter(changes.selectedRecordsSearchTerm, this.filterSelectedBy);
  }

}
