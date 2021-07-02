import {AfterViewInit, Directive, Inject} from '@angular/core';
import {ListHeightRecalculateTrigger} from '../injectionTokens';
import {PanelHeight} from '../PanelHeight';
import {takeUntil} from 'rxjs/operators';
import {DestroyableComponent} from '../DestroyableComponent';
import {Defaults} from '../Defaults';

@Directive({
  selector: '[panelResizer]'
})
export class PanelResizerDirective extends DestroyableComponent implements AfterViewInit {

  constructor(
    @Inject(ListHeightRecalculateTrigger) private h: PanelHeight,
    private defaults: Defaults
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.h.trigger.pipe(
      takeUntil(this.destroy)
    ).subscribe(p => {
      const actualHeight = p.getContentHeight();
      const {listHeight} = this.defaults;
      if (actualHeight < listHeight) {
        p.setHeight(Math.round(actualHeight) + 1);
      } else {
        p.setHeight(listHeight);
      }
    });
  }

}
