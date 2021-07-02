import {Injectable} from '@angular/core';
import {OverlayPanel} from '../OverlayPanel';
import {ISimpleChange} from '../SimpleChanges';
import {Observable, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DestroyableComponent} from '../DestroyableComponent';

@Injectable()
export abstract class PanelVisibilityMonitorDirectiveBase extends DestroyableComponent {

  private visibilitySubscription?: Subscription;

  protected constructor(
    protected panel: OverlayPanel
  ) {
    super();
  }

  protected handleHideSignalChanges(change: ISimpleChange<Observable<any>> | undefined): void {
    if (change && change.currentValue && change.previousValue !== change.currentValue) {
      if (this.visibilitySubscription) {
        this.visibilitySubscription.unsubscribe();
      }
      this.visibilitySubscription = change.currentValue.pipe(
        takeUntil(this.destroy)
      ).subscribe(_ => this.panel.close());
    }
  }
}
