import {Directive, OnInit, Inject, NgZone, Optional} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {filter} from 'rxjs/operators';
import {ScrollControlToken} from '../injectionTokens';
import {ScrollControl} from '../ScrollControl';

@Directive({
  selector: '[scrollListener]'
})
export class ScrollListenerDirective implements OnInit {

  constructor(
    private scrollViewport: CdkVirtualScrollViewport,
    @Optional() @Inject(ScrollControlToken) private scroll: ScrollControl,
    private zone: NgZone,
  ) {
  }

  public ngOnInit(): void {
    if (this.scroll) {
      const viewport = this.scrollViewport;
      viewport.elementScrolled().pipe(
        filter(_ => this.scroll.scrollEmitter.observers.length !== 0)
      ).subscribe(_ => {
        this.zone.run(() => {
          this.scroll.scrollEmitter.emit({
            bottom: viewport.measureScrollOffset('bottom'),
            top: viewport.measureScrollOffset('top')
          });
        });
      });
    }
  }

}
