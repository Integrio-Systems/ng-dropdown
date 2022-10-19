import {EventEmitter, Injectable, Input, NgZone, Output} from '@angular/core';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {DestroyableComponent} from '../DestroyableComponent';
import {VirtualScrollHolder} from '../VirtualScrollHolder';
import {IScrollInfo} from '../IScrollInfo';

@Injectable()
export abstract class ListScrollMonitorDirectiveBase extends DestroyableComponent {

  @Output()
  public readonly panelScrolled: EventEmitter<IScrollInfo>;

  @Input()
  public notifyWhen: (s: IScrollInfo) => boolean;

  protected constructor(
    protected scrollHolder: VirtualScrollHolder,
    zone: NgZone
  ) {
    super();
    scrollHolder.set$.pipe(
      switchMap(r => r.elementScrolled().pipe(
          filter(_ => this.panelScrolled.observers.length !== 0),
          map(_ => ({
            bottom: r.measureScrollOffset('bottom'),
            top: r.measureScrollOffset('top')
          }))
        )
      ),
      filter(v => this.notifyWhen ? this.notifyWhen(v) : true),
      takeUntil(this.destroy)
    ).subscribe(e => {
      zone.run(() => this.panelScrolled.emit(e));
    });
  }

  public scrollTop(v: number) {
    this.scrollHolder.wrapper.scrollTop(v);
  }

}
