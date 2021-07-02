import {FilterableRecords} from './FilterableRecords';

export class AvailableRecords extends FilterableRecords {

  protected allRecords: any[] = [];

  public setAllRecords(records?: any[]): void {
    this.allRecords = records || [];
    this.notifyRecordsChanged();
  }

  protected getAllRecords(): ReadonlyArray<any> {
    return this.allRecords;
  }
}
