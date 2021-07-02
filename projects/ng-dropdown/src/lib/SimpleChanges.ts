export interface ISimpleChange<T> {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;

  isFirstChange(): boolean;
}

export type SimpleChanges<T extends object> = {
  [K in keyof T]?: ISimpleChange<T[K]>;
};

