import {Directive, ElementRef, Optional} from '@angular/core';
import {
  AvailableListHeightRecalculateTrigger,
  AvailableRecordsPanelScrollControlToken,
  AvailableRecordsPanelToken,
  OverlayPanelToken,
  ScrollControlToken, ListHeightRecalculateTrigger
} from '../injectionTokens';
import {existedOrNewPanelHeightChangeTrigger, existedScrollControl} from './factories';

@Directive({
  selector: '[availableRecordsPanel]',
  providers: [
    {
      provide: OverlayPanelToken,
      useExisting: AvailableRecordsPanelToken
    },
    {
      provide: ListHeightRecalculateTrigger,
      useFactory: existedOrNewPanelHeightChangeTrigger,
      deps: [[new Optional(), AvailableListHeightRecalculateTrigger]]
    },
    {
      provide: ScrollControlToken,
      useFactory: existedScrollControl,
      deps: [[new Optional(), AvailableRecordsPanelScrollControlToken]]
    }
  ]
})
export class AvailableRecordsPanelDirective {

  constructor(
    public element: ElementRef<HTMLElement>
  ) {
  }

}
