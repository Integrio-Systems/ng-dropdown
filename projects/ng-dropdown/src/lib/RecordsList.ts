interface IRecordsListParams {
  element: HTMLElement;
  updateHeight: () => void;
  getHeight: () => number;
}

export interface IRecordsList {
  setHeight(h: number): void;

  getContentHeight(): number;
}


export class EmptyRecordsList implements IRecordsList {

  public setHeight(h: number): void {
  }

  public getContentHeight(): number {
    return 0;
  }

}

export class RecordsList implements IRecordsList {

  private readonly lst: IRecordsListParams;

  constructor(l: IRecordsListParams) {
    this.lst = l;
  }

  public setHeight(h: number): void {
    this.lst.element.style.height = h + 'px';
    this.lst.updateHeight();
  }

  public getContentHeight(): number {
    return this.lst.getHeight();
  }

}

