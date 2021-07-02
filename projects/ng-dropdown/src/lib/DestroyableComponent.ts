import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class DestroyableComponent implements OnDestroy {

  protected readonly destroy = new Subject();

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
