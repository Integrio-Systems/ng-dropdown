import {Directive, ElementRef, Inject} from '@angular/core';
import {Defaults, VirtualScrollHolderToken} from '../injectionTokens';
import {takeUntil} from 'rxjs/operators';
import {DestroyableComponent} from '../DestroyableComponent';
import {NgDropdownInternals} from '../NgDropdownInternals';
import {VirtualScrollHolder} from '../VirtualScrollHolder';
import {ContentObserver} from '@angular/cdk/observers';

@Directive({
  selector: '[panelResizer]'
})
export class PanelResizerDirective extends DestroyableComponent {

  constructor(
    @Inject(VirtualScrollHolderToken) vs: VirtualScrollHolder,
    @Inject(Defaults) defaults: NgDropdownInternals,
    observer: ContentObserver,
    el: ElementRef
  ) {
    super();
    observer.observe(el).pipe(
      takeUntil(this.destroy)
    ).subscribe(_ => {
      const {listHeight} = defaults;
      const actualHeight = vs.wrapper.getContentHeight();
      const height = actualHeight < listHeight ? Math.round(actualHeight) + 1 : listHeight;
      vs.wrapper.setHeight(height);
    });
  }

}
