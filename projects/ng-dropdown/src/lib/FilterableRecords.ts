import {BehaviorSubject} from 'rxjs';
import {FilterBy} from './FilterBy';

type Filter = (record: any) => boolean;

export abstract class FilterableRecords {

  protected readonly filtered = new BehaviorSubject<ReadonlyArray<any>>([]);
  private filterer: Filter | null = null;

  public readonly filtered$ = this.filtered.asObservable();

  protected notifyRecordsChanged(): void {
    const selected = this.getAllRecords();
    const records = this.filterer ? selected.filter(this.filterer) : selected;
    this.filtered.next([...records]);
  }

  protected abstract getAllRecords(): ReadonlyArray<any>;

  public abstract setAllRecords(records: any[]): void;

  private getFilter(filterBy: FilterBy | null, pattern: string): Filter {
    if (typeof filterBy === 'string') {
      return (record: any) => record[filterBy] === pattern;
    } else if (typeof filterBy === 'function') {
      return (record: any) => filterBy(record, pattern);
    } else {
      return (record: any) => record === pattern;
    }
  }

  public filter(filterBy: FilterBy | null, pattern: string): void {
    this.filterer = this.getFilter(filterBy, pattern);
    this.notifyRecordsChanged();
  }

  public resetFilter(): void {
    this.filterer = null;
    this.notifyRecordsChanged();
  }

  public dispose(): void {
    this.filtered.complete();
  }
}
