import {IItemsHolder} from './IItemsHolder';

export class FlatItemsHolder implements IItemsHolder {

  constructor(public items: any[]) {
  }

  public getLevel(): number {
    return 1;
  }

  public isGroup(): boolean {
    return false;
  }

}
