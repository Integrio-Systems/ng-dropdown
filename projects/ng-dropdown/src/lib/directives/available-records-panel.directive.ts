import {Directive, ElementRef} from '@angular/core';
import {
  AvailableRecordsPanelOverlayToken,
  OverlayPanelToken,
  VirtualScrollHolderToken, AvailableRecordsVirtualScrollHolderToken
} from '../injectionTokens';

@Directive({
  selector: '[availableRecordsPanel]',
  providers: [
    {
      provide: VirtualScrollHolderToken,
      useExisting: AvailableRecordsVirtualScrollHolderToken
    },
    {
      provide: OverlayPanelToken,
      useExisting: AvailableRecordsPanelOverlayToken
    }
  ]
})
export class AvailableRecordsPanelDirective {

  constructor(
    public element: ElementRef<HTMLElement>
  ) {
  }

}
