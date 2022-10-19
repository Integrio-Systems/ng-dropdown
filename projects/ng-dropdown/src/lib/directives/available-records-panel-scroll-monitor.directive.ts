import {Directive, EventEmitter, Inject, Input, NgZone, Output} from '@angular/core';
import {AvailableRecordsVirtualScrollHolderToken} from '../injectionTokens';
import {VirtualScrollHolder} from '../VirtualScrollHolder';
import {IScrollInfo} from '../IScrollInfo';
import {ListScrollMonitorDirectiveBase} from './ListScrollMonitorDirectiveBase';

@Directive({
  selector: '[availableRecordsPanelScrollMonitor]',
  exportAs: 'availableRecordsPanelScroll'
})
export class AvailableRecordsPanelScrollMonitorDirective extends ListScrollMonitorDirectiveBase {

  @Output('availableRecordsPanelScrolled')
  public readonly panelScrolled = new EventEmitter<IScrollInfo>();

  @Input('availableRecordsPanelScrollNotifyWhen')
  public notifyWhen: (s: IScrollInfo) => boolean;

  constructor(
    @Inject(AvailableRecordsVirtualScrollHolderToken) scrollHolder: VirtualScrollHolder,
    zone: NgZone
  ) {
    super(scrollHolder, zone);
  }

}
