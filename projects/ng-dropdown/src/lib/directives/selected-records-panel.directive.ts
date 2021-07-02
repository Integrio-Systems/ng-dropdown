import {Directive, ElementRef, Optional} from '@angular/core';
import {
  OverlayPanelToken,
  ListHeightRecalculateTrigger,
  ScrollControlToken,
  SelectedListHeightRecalculateTrigger,
  SelectedRecordsPanelScrollControlToken,
  SelectedRecordsPanelToken
} from '../injectionTokens';
import {existedOrNewPanelHeightChangeTrigger, existedScrollControl} from './factories';

@Directive({
  selector: '[selectedRecordsPanel]',
  providers: [
    {
      provide: OverlayPanelToken,
      useExisting: SelectedRecordsPanelToken
    },
    {
      provide: ScrollControlToken,
      useFactory: existedScrollControl,
      deps: [[new Optional(), SelectedRecordsPanelScrollControlToken]]
    },
    {
      provide: ListHeightRecalculateTrigger,
      useFactory: existedOrNewPanelHeightChangeTrigger,
      deps: [[new Optional(), SelectedListHeightRecalculateTrigger]]
    }
  ]
})
export class SelectedRecordsPanelDirective {

  constructor(
    public element: ElementRef<HTMLElement>
  ) {
  }

}
