import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Subject} from 'rxjs';

interface IScroll {

  setHeight(h: number): void;

  scrollTop(v: number): void;

  getContentHeight(): number;
}


class EmptyScroll implements IScroll {

  public static readonly instance = new EmptyScroll();

  private constructor() {
  }

  public setHeight(h: number): void {
  }

  public scrollTop(v: number) {
  }

  public getContentHeight(): number {
    return 0;
  }

}

class InitializedScroll implements IScroll {

  constructor(private scroll: CdkVirtualScrollViewport) {
  }

  public setHeight(h: number): void {
    this.scroll.getElementRef().nativeElement.style.height = h + 'px';
    this.scroll.checkViewportSize();
  }

  public scrollTop(v: number) {
    this.scroll.scrollTo({
      top: v
    });
  }

  public getContentHeight(): number {
    return this.scroll.measureRenderedContentSize();
  }
}


export class VirtualScrollHolder {

  public wrapper: IScroll = EmptyScroll.instance;

  public readonly set$ = new Subject<CdkVirtualScrollViewport>();

  public set(s: CdkVirtualScrollViewport) {
    this.wrapper = new InitializedScroll(s);
    this.set$.next(s);
  }

  public reset() {
    this.wrapper = EmptyScroll.instance;
  }

}
