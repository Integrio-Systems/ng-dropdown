import {Directive, ElementRef} from '@angular/core';
import {
  OverlayPanelToken, SelectedRecordsPanelOverlayToken, VirtualScrollHolderToken, SelectedRecordsVirtualScrollHolderToken
} from '../injectionTokens';

@Directive({
  selector: '[selectedRecordsPanel]',
  providers: [
    {
      provide: VirtualScrollHolderToken,
      useExisting: SelectedRecordsVirtualScrollHolderToken
    },
    {
      provide: OverlayPanelToken,
      useExisting: SelectedRecordsPanelOverlayToken
    }
  ]
})
export class SelectedRecordsPanelDirective {

  constructor(
    public element: ElementRef<HTMLElement>
  ) {
  }

}
