import {Directive, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ScrollControlToken} from '../injectionTokens';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ScrollControl} from '../ScrollControl';

@Directive({
  selector: '[scrollTop]'
})
export class ScrollTopDirective implements OnInit, OnDestroy {

  private readonly destroy = new Subject();

  constructor(
    private scrollViewport: CdkVirtualScrollViewport,
    @Optional() @Inject(ScrollControlToken) private scroll: ScrollControl,
  ) {
  }

  public ngOnInit(): void {
    if (this.scroll) {
      this.scroll.scrollReceiver.pipe(
        takeUntil(this.destroy)
      ).subscribe(top => this.scrollViewport.scrollTo({
        top
      }));
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
