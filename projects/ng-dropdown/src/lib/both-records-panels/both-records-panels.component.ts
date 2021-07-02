import {AfterContentInit, Component, ContentChild, Inject, OnInit} from '@angular/core';
import {
  AvailableListHeightRecalculateTrigger,
  AvailableRecordsHolderToken,
  MixedPanelsToken,
  SelectedListHeightRecalculateTrigger, SelectedRecordsHolderToken
} from '../injectionTokens';
import {OverlayPanel} from '../OverlayPanel';
import {delay, filter, first, takeUntil} from 'rxjs/operators';
import {PanelHeight} from '../PanelHeight';
import {combineLatest, Observable, of} from 'rxjs';
import {DestroyableComponent} from '../DestroyableComponent';
import {FilterableRecords} from '../FilterableRecords';
import {SelectedRecords} from '../SelectedRecords';
import {EmptyRecordsList} from '../RecordsList';
import {AvailableRecordsPanelDirective} from '../directives/available-records-panel.directive';
import {SelectedRecordsPanelDirective} from '../directives/selected-records-panel.directive';
import {Defaults} from '../Defaults';
import {delayFirst} from '../delayFirst';

export function listHeightRecalculateTriggerFactory() {
  return new PanelHeight();
}

@Component({
  selector: 'both-records-panels',
  templateUrl: './both-records-panels.component.html',
  styleUrls: ['./both-records-panels.component.scss'],
  providers: [
    {
      provide: AvailableListHeightRecalculateTrigger,
      useFactory: listHeightRecalculateTriggerFactory
    },
    {
      provide: SelectedListHeightRecalculateTrigger,
      useFactory: listHeightRecalculateTriggerFactory
    }
  ]
})
export class BothRecordsPanelsComponent extends DestroyableComponent implements OnInit, AfterContentInit {

  public readonly show!: Observable<boolean>;

  @ContentChild(AvailableRecordsPanelDirective, {static: false})
  public availableRecordsPanel: AvailableRecordsPanelDirective;

  @ContentChild(SelectedRecordsPanelDirective, {static: false})
  public selectedRecordsPanel: SelectedRecordsPanelDirective;

  constructor(
    @Inject(MixedPanelsToken) private overlay: OverlayPanel,
    @Inject(AvailableListHeightRecalculateTrigger) private available: PanelHeight,
    @Inject(SelectedListHeightRecalculateTrigger) private selected: PanelHeight,
    @Inject(AvailableRecordsHolderToken) private availableRecords: FilterableRecords,
    @Inject(SelectedRecordsHolderToken) private selectedRecords: SelectedRecords,
    private defaults: Defaults
  ) {
    super();
    this.show = this.overlay.visibilityChange.pipe(
      filter(v => v),
      first(),
      delay(0),
      takeUntil(this.destroy)
    );
  }

  public ngOnInit() {

    const {listHeight} = this.defaults;

    combineLatest([
      this.available.trigger,
      this.selected.trigger
    ]).pipe(
      delayFirst(0),
      takeUntil(this.destroy)
    ).subscribe(([availableList, selectedList]) => {
      availableList.setHeight(listHeight);
      selectedList.setHeight(listHeight);
      const availableRecordsContentHeight = availableList.getContentHeight();
      const selectedRecordsContentHeight = selectedList.getContentHeight();
      const availableListLessThenDefaultAndBigger = availableRecordsContentHeight < listHeight
        && availableRecordsContentHeight >= selectedRecordsContentHeight;
      const selectedListLessThenDefaultAndBigger = selectedRecordsContentHeight < listHeight
        && selectedRecordsContentHeight >= availableRecordsContentHeight;
      const availableRecordsPanelHeight = Math.round(this.availableRecordsPanel.element.nativeElement.clientHeight);
      const selectedRecordsPanelHeight = Math.round(this.selectedRecordsPanel.element.nativeElement.clientHeight);
      let availableHeight;
      let selectedHeight;
      if (availableListLessThenDefaultAndBigger || selectedListLessThenDefaultAndBigger) {
        availableHeight = selectedHeight = Math.round(Math.max(availableRecordsContentHeight, selectedRecordsContentHeight));
      } else {
        availableHeight = selectedHeight = listHeight;
      }
      const panelsHeightDiff = Math.abs(availableRecordsPanelHeight - selectedRecordsPanelHeight);
      const availableRecordsPanelDiff = availableRecordsPanelHeight > selectedRecordsPanelHeight ? panelsHeightDiff : 0;
      const selectedRecordsPanelDiff = selectedRecordsPanelHeight > availableRecordsPanelHeight ? panelsHeightDiff : 0;
      availableList.setHeight(availableHeight + selectedRecordsPanelDiff);
      selectedList.setHeight(selectedHeight + availableRecordsPanelDiff);
    });
  }

  public ngAfterContentInit(): void {
    this.availableRecords.filtered$.pipe(
      filter(v => v.length === 0),
      takeUntil(this.destroy)
    ).subscribe(_ => this.available.trigger.next(new EmptyRecordsList()));
    this.selectedRecords.filtered$.pipe(
      filter(v => v.length === 0),
      takeUntil(this.destroy)
    ).subscribe(_ => this.selected.trigger.next(new EmptyRecordsList()));
  }

}
