import {Directive, EventEmitter, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map, takeUntil} from 'rxjs/operators';
import {NgDropdownComponent} from '../../../ng-dropdown/src/lib/dropdown/ng-dropdown.component';
import {DestroyableComponent} from '../../../ng-dropdown/src/lib/DestroyableComponent';

@Directive({
  selector: '[compactModeSwitcher]'
})
export class CompactModeSwitcherDirective extends DestroyableComponent implements OnInit {

  @Output()
  public readonly compactChange = new EventEmitter();

  constructor(
    private o: BreakpointObserver,
    private list: NgDropdownComponent
  ) {
    super();
  }

  public ngOnInit(): void {
    this.o.observe('(max-width: 600px)').pipe(
      map(r => r.matches),
      takeUntil(this.destroy)
    ).subscribe(v => {
      this.list.compact = v;
      this.list.showSelected = v;
    });
  }

}
