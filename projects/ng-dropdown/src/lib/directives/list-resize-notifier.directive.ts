import {AfterViewInit, ContentChild, Directive, Inject} from '@angular/core';
import {CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {takeUntil} from 'rxjs/operators';
import {ListHeightRecalculateTrigger} from '../injectionTokens';
import {PanelHeight} from '../PanelHeight';
import {RecordsList} from '../RecordsList';
import {DestroyableComponent} from '../DestroyableComponent';
import {delayFirst} from '../delayFirst';

@Directive({
  selector: '[listResizeNotifier]'
})
export class ListResizeNotifierDirective extends DestroyableComponent implements AfterViewInit {

  @ContentChild(CdkVirtualForOf, {static: true})
  public forOf!: CdkVirtualForOf<any>;

  constructor(
    private scrollViewport: CdkVirtualScrollViewport,
    @Inject(ListHeightRecalculateTrigger) private ph: PanelHeight
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    const viewport = this.scrollViewport;
    this.forOf.dataStream.pipe(
      delayFirst(0),
      takeUntil(this.destroy)
    ).subscribe(_ => {
      this.ph.trigger.next(new RecordsList({
        element: viewport.getElementRef().nativeElement,
        getHeight: () => viewport.measureRenderedContentSize(),
        updateHeight: () => viewport.checkViewportSize(),
      }));
    });
  }

}
