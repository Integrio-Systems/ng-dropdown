import {Pipe, PipeTransform} from '@angular/core';

interface IGroup {
  key: string;
  items: any[];
}

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  private lastOutput: any[] = [];
  private input?: any[];
  private groupBy?: string;

  private group(records: any[], groupBy: string): IGroup[] {
    const dictionary: { [key: string]: any[] } = {};
    for (const record of records) {
      const group = record[groupBy];
      if (dictionary[group]) {
        dictionary[group].push(record);
      } else {
        dictionary[group] = [record];
      }
    }
    return Object.keys(dictionary).map(key => ({key, items: dictionary[key]}));
  }

  public transform(value: any[], groupBy?: string): any[] {
    const recalculate = value !== this.input || this.groupBy !== groupBy;
    this.input = value;
    this.groupBy = groupBy;
    if (recalculate) {
      this.lastOutput = !groupBy ? this.input : this.group(value, groupBy);
    }
    return this.lastOutput;
  }

}
