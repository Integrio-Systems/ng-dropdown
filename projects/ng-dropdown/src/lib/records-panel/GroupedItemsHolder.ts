import {IItemsHolder} from './IItemsHolder';

interface IGroup {
  name: string;
  items: any[];
  groups?: IGroup[];
  level: number;
}

class Group {
  constructor(
    public readonly name: string,
    public readonly level: number
  ) {
  }
}

export class GroupedItemsHolder implements IItemsHolder {

  private readonly groupBy: string;

  public readonly items: any[];

  constructor(records: any[], groupBy: string) {
    this.groupBy = groupBy;
    this.items = this.flatten(this.group(records, groupBy));
  }

  private flatten(groups: IGroup[]) {
    const stack = [...groups];
    const result = [];
    while (stack.length !== 0) {
      const group = stack.shift();
      result.push(new Group(group.name, group.level));
      for (const item of group.items) {
        result.push(item);
      }
      if (group.groups) {
        stack.unshift(...group.groups);
      }
    }
    return result;
  }

  private group(records: any[], groupBy: string): IGroup[] {
    const result: IGroup[] = [];
    const groupsMap = new Map<string, IGroup>();
    for (const record of records) {
      let group: IGroup;
      const recordGroups = Array.isArray(record[groupBy]) ? record[groupBy] : [record[groupBy]];
      for (const recordGroup of recordGroups) {
        if (groupsMap.has(recordGroup)) {
          group = groupsMap.get(recordGroup);
        } else {
          const newGroup: IGroup = {
            name: recordGroup,
            items: [],
            groups: [],
            level: 0
          };
          if (group) {
            newGroup.level = group.level + 1;
            group.groups.push(newGroup);
          } else {
            newGroup.level = 1;
            result.push(newGroup);
          }
          group = newGroup;
          groupsMap.set(recordGroup, group);
        }
      }
      group.items.push(record);
    }
    groupsMap.clear();
    return result;
  }

  public getLevel(record: any) {
    if (record instanceof Group) {
      return record.level;
    } else {
      return record[this.groupBy].length;
    }
  }

  public isGroup(record: any) {
    return record instanceof Group;
  }

}
