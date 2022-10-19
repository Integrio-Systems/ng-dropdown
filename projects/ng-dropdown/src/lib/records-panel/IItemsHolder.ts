export interface IItemsHolder {
  items: any[];
  getLevel: (record: any) => number;
  isGroup: (record: any) => boolean;
}
