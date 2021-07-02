import {Directive, Inject, Input, OnChanges} from '@angular/core';
import {FilterBy} from '../FilterBy';
import {AvailableRecordsHolderToken} from '../injectionTokens';
import {SimpleChanges} from '../SimpleChanges';
import {RecordsFilterDirectiveBase} from './RecordsFilterDirectiveBase';
import {FilterableRecords} from '../FilterableRecords';

@Directive({
  selector: '[availableRecordsFilter]'
})
export class AvailableRecordsFilterDirective extends RecordsFilterDirectiveBase implements OnChanges {

  @Input()
  public filterAvailableBy?: FilterBy;

  @Input()
  public availableRecordsSearchTerm?: string;

  constructor(
    @Inject(AvailableRecordsHolderToken) available: FilterableRecords
  ) {
    super(available);
  }

  public ngOnChanges(changes: SimpleChanges<AvailableRecordsFilterDirective>): void {
    this.updateFilter(changes.availableRecordsSearchTerm, this.filterAvailableBy);
  }

}
