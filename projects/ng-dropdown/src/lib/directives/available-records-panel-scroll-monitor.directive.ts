import {Directive, Inject, Input, OnChanges, Output} from '@angular/core';
import {AvailableRecordsPanelScrollControlToken} from '../injectionTokens';
import {scrollControlFactory} from './factories';
import {ScrollControl} from '../ScrollControl';
import {ListScrollMonitorDirectiveBase} from './ListScrollMonitorDirectiveBase';
import {Observable} from 'rxjs';
import {SimpleChanges} from '../SimpleChanges';

@Directive({
  selector: '[availableRecordsPanelScrollMonitor]',
  providers: [
    {
      provide: AvailableRecordsPanelScrollControlToken,
      useFactory: scrollControlFactory
    }
  ]
})
export class AvailableRecordsPanelScrollMonitorDirective extends ListScrollMonitorDirectiveBase implements OnChanges {

  @Input()
  public availableRecordsPanelScrollTopSignal!: Observable<number>;

  @Output()
  public readonly availableRecordsPanelScrolled = this.scroll.scrollEmitter;

  constructor(
    @Inject(AvailableRecordsPanelScrollControlToken) scroll: ScrollControl
  ) {
    super(scroll);
  }

  public ngOnChanges(changes: SimpleChanges<AvailableRecordsPanelScrollMonitorDirective>): void {
    this.handleScrollTopSignalChanges(changes.availableRecordsPanelScrollTopSignal);
  }

}
