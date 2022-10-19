import {Directive, Inject, OnDestroy} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {VirtualScrollHolderToken} from '../injectionTokens';
import {VirtualScrollHolder} from '../VirtualScrollHolder';

@Directive({
  selector: '[virtualScrollHook]'
})
export class VirtualScrollHookDirective implements OnDestroy {

  constructor(
    scroll: CdkVirtualScrollViewport,
    @Inject(VirtualScrollHolderToken) private scrollHolder: VirtualScrollHolder
  ) {
    scrollHolder.set(scroll);
  }

  public ngOnDestroy(): void {
    this.scrollHolder.reset();
  }

}
