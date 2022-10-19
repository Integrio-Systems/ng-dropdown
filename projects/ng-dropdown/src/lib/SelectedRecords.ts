import {FilterableRecords} from './FilterableRecords';

export enum ValueMode {
  multi,
  single
}

export type Value = any | any[];

type ValueMapper = (record: any) => any;

type Comparer = (a: any, b: any) => boolean;

export type ValueBinder = string | ValueMapper;

const defaultValueMapper = (r: any) => r;

interface IRecord {
  data?: any;
  ngModel?: any;
}

export class SelectedRecords extends FilterableRecords {

  private type?: ValueMode = ValueMode.single;
  private allRecords: any[] = [];
  private valueMapper: ValueMapper = defaultValueMapper;
  private comparer?: Comparer;
  private selected: IRecord[] = [];

  private getValueMapper(binder?: ValueBinder): ValueMapper {
    const type = typeof binder;
    switch (type) {
      case 'string':
        return r => r[binder as string];
      case 'function':
        return binder as ValueMapper;
      default:
        return defaultValueMapper;
    }
  }

  private compare(model: any, record: any): boolean {
    if (this.comparer) {
      return this.comparer(model, record);
    }
    return this.valueMapper(record) === model;
  }

  private updateSelectedRecords(): void {
    this.selected.forEach(r => {
      const data = this.allRecords.find(x => this.compare(r.ngModel, x)) || r.ngModel;
      r.ngModel = this.valueMapper(data) || r.ngModel;
      r.data = data;
    });
    this.notifyRecordsChanged();
  }

  protected getAllRecords = (): readonly any[] => this.records;

  public setAllRecords(records?: any[]): void {
    this.allRecords = records || [];
    this.updateSelectedRecords();
  }

  public select(record: any): void {
    if (this.type === ValueMode.single) {
      this.selected = [{
        data: record,
        ngModel: this.valueMapper(record)
      }];
    } else {
      const index = this.selected.findIndex(r => r.data === record);
      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push({
          data: record,
          ngModel: this.valueMapper(record)
        });
      }
    }
    this.updateSelectedRecords();
  }

  public set(v: Value): void {
    if (this.type === ValueMode.single) {
      this.selected = [{
        ngModel: v
      }];
    } else {
      this.selected = Array.isArray(v) ? v.map(r => ({ngModel: r})) : [];
    }
    this.updateSelectedRecords();
  }

  public clear(): void {
    this.selected.length = 0;
    this.updateSelectedRecords();
  }

  public setMode(t: ValueMode): void {
    if (this.type !== t) {
      this.clear();
      this.notifyRecordsChanged();
    }
    this.type = t;
  }

  public setValueBinder(binder?: ValueBinder): void {
    this.valueMapper = this.getValueMapper(binder);
    this.updateSelectedRecords();
  }

  public setRecordComparer(c?: Comparer): void {
    this.comparer = c;
    this.updateSelectedRecords();
  }

  public get records(): ReadonlyArray<any> {
    return this.selected.map(r => r.data);
  }

  public get ngModel(): any {
    const value = this.selected.map(r => r.ngModel);
    return this.type === ValueMode.multi ? value : value[0];
  }

  public get isEmpty(): boolean {
    return this.selected.length === 0;
  }

  public isSelected = (v: any): boolean => this.selected.findIndex(r => r.data === v) !== -1;
}
