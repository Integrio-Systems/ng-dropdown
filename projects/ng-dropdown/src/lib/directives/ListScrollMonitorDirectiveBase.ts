import {Injectable} from '@angular/core';
import {ScrollControl} from '../ScrollControl';
import {ISimpleChange} from '../SimpleChanges';
import {Observable, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DestroyableComponent} from '../DestroyableComponent';

@Injectable()
export abstract class ListScrollMonitorDirectiveBase extends DestroyableComponent {

  private scrollSubscription?: Subscription;

  protected constructor(
    protected scroll: ScrollControl
  ) {
    super();
  }

  protected handleScrollTopSignalChanges(change: ISimpleChange<Observable<number>> | undefined): void {
    if (change && change.currentValue && change.previousValue !== change.currentValue) {
      if (this.scrollSubscription) {
        this.scrollSubscription.unsubscribe();
      }
      this.scrollSubscription = change.currentValue.pipe(
        takeUntil(this.destroy)
      ).subscribe(v => this.scroll.scrollReceiver.next(v));
    }
  }

}
