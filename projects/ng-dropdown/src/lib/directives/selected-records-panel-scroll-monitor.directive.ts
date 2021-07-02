import {Directive, Inject, Input, OnChanges, Output} from '@angular/core';
import {ListScrollMonitorDirectiveBase} from './ListScrollMonitorDirectiveBase';
import {SimpleChanges} from '../SimpleChanges';
import {SelectedRecordsPanelScrollControlToken} from '../injectionTokens';
import {ScrollControl} from '../ScrollControl';
import {Observable} from 'rxjs';
import {scrollControlFactory} from './factories';

@Directive({
  selector: '[selectedRecordsPanelScrollMonitor]',
  providers: [
    {
      provide: SelectedRecordsPanelScrollControlToken,
      useFactory: scrollControlFactory
    }
  ]
})
export class SelectedRecordsPanelScrollMonitorDirective extends ListScrollMonitorDirectiveBase implements OnChanges {

  @Output()
  public readonly selectedRecordsPanelScrolled = this.scroll.scrollEmitter;

  @Input()
  public selectedRecordsPanelScrollTopSignal!: Observable<number>;

  constructor(
    @Inject(SelectedRecordsPanelScrollControlToken) scroll: ScrollControl
  ) {
    super(scroll);
  }

  public ngOnChanges(changes: SimpleChanges<SelectedRecordsPanelScrollMonitorDirective>): void {
    this.handleScrollTopSignalChanges(changes.selectedRecordsPanelScrollTopSignal);
  }

}
