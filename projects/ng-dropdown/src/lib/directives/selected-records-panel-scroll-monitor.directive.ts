import {Directive, EventEmitter, Inject, Input, NgZone, Output} from '@angular/core';
import {ListScrollMonitorDirectiveBase} from './ListScrollMonitorDirectiveBase';
import {SelectedRecordsVirtualScrollHolderToken} from '../injectionTokens';
import {IScrollInfo} from '../IScrollInfo';
import {VirtualScrollHolder} from '../VirtualScrollHolder';

@Directive({
  selector: '[selectedRecordsPanelScrollMonitor]',
  exportAs: 'selectedRecordsPanelScroll'
})
export class SelectedRecordsPanelScrollMonitorDirective extends ListScrollMonitorDirectiveBase {

  @Output('selectedRecordsPanelScrolled')
  public readonly panelScrolled = new EventEmitter<IScrollInfo>();

  @Input('selectedRecordsPanelScrollNotifyWhen')
  public notifyWhen: (s: IScrollInfo) => boolean;

  constructor(
    @Inject(SelectedRecordsVirtualScrollHolderToken) scrollHolder: VirtualScrollHolder,
    zone: NgZone
  ) {
    super(scrollHolder, zone);
  }

}
