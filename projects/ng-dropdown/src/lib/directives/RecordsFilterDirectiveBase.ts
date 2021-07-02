import {Injectable} from '@angular/core';
import {FilterableRecords} from '../FilterableRecords';
import {ISimpleChange} from '../SimpleChanges';
import {FilterBy} from '../FilterBy';

@Injectable()
export abstract class RecordsFilterDirectiveBase {

  protected constructor(
    private recordsHolder: FilterableRecords
  ) {
  }

  protected updateFilter(
    searchPattern?: ISimpleChange<string | undefined>,
    filterBy?: FilterBy
  ): void {
    if (searchPattern && searchPattern.currentValue) {
      this.recordsHolder.filter(filterBy || null, searchPattern.currentValue);
    }
    const searchTermChanged = searchPattern && searchPattern.currentValue !== searchPattern.previousValue;
    const searchTermEmpty = !searchPattern || searchPattern.currentValue === null
      || searchPattern.currentValue === undefined
      || searchPattern.currentValue === '';
    if (searchTermChanged && searchTermEmpty) {
      this.recordsHolder.resetFilter();
    }
  }

}
