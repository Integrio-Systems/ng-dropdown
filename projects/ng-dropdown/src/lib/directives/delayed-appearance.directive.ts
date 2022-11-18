import {ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject} from '@angular/core';
import {Defaults} from '../injectionTokens';
import {NgDropdownInternals} from '../NgDropdownInternals';
import {ContentObserver} from '@angular/cdk/observers';
import {DestroyableComponent} from '../DestroyableComponent';
import {delay, take, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[delayedAppearance]'
})
export class DelayedAppearanceDirective extends DestroyableComponent {

  @HostBinding('class.hidden')
  public hidden = true;

  constructor(
    @Inject(Defaults) defaults: NgDropdownInternals,
    observer: ContentObserver,
    el: ElementRef<HTMLElement>,
    cd: ChangeDetectorRef
  ) {
    super();
    observer.observe(el).pipe(
      take(1),
      delay(defaults.panelShowDelay),
      takeUntil(this.destroy)
    ).subscribe(_ => {
      this.hidden = false;
      cd.markForCheck();
    });
  }

}
