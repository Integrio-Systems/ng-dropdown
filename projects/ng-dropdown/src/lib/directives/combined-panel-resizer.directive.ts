import {Directive, ElementRef, Inject, Input} from '@angular/core';
import {AvailableRecordsVirtualScrollHolderToken, Defaults, SelectedRecordsVirtualScrollHolderToken} from '../injectionTokens';
import {VirtualScrollHolder} from '../VirtualScrollHolder';
import {NgDropdownInternals} from '../NgDropdownInternals';
import {ContentObserver} from '@angular/cdk/observers';
import {takeUntil} from 'rxjs/operators';
import {DestroyableComponent} from '../DestroyableComponent';

interface IPanel {
  element: ElementRef<HTMLElement>;
}

@Directive({
  selector: '[combinedPanelResizer]'
})
export class CombinedPanelResizerDirective extends DestroyableComponent {

  @Input('combinedPanelResizer')
  public panels: IPanel[];

  constructor(
    @Inject(AvailableRecordsVirtualScrollHolderToken) private as: VirtualScrollHolder,
    @Inject(SelectedRecordsVirtualScrollHolderToken) private ss: VirtualScrollHolder,
    @Inject(Defaults) private defaults: NgDropdownInternals,
    observer: ContentObserver,
    el: ElementRef<HTMLElement>,
  ) {
    super();
    observer.observe(el).pipe(
      takeUntil(this.destroy)
    ).subscribe(_ => this.recalculateHeight());
  }

  private recalculateHeight() {

    const {listHeight} = this.defaults;
    const availableList = this.as.wrapper;
    const selectedList = this.ss.wrapper;
    const [availableRecordsPanel, selectedRecordsPanel] = this.panels;

    availableList.setHeight(listHeight);
    selectedList.setHeight(listHeight);
    const availableRecordsContentHeight = availableList.getContentHeight();
    const selectedRecordsContentHeight = selectedList.getContentHeight();
    const availableListLessThenDefaultAndBigger = availableRecordsContentHeight < listHeight
      && availableRecordsContentHeight >= selectedRecordsContentHeight;
    const selectedListLessThenDefaultAndBigger = selectedRecordsContentHeight < listHeight
      && selectedRecordsContentHeight >= availableRecordsContentHeight;
    const availableRecordsPanelHeight = Math.ceil(availableRecordsPanel.element.nativeElement.clientHeight);
    const selectedRecordsPanelHeight = Math.ceil(selectedRecordsPanel.element.nativeElement.clientHeight);
    let availableHeight;
    let selectedHeight;
    if (availableListLessThenDefaultAndBigger || selectedListLessThenDefaultAndBigger) {
      availableHeight = selectedHeight = Math.ceil(Math.max(availableRecordsContentHeight, selectedRecordsContentHeight));
    } else {
      availableHeight = selectedHeight = listHeight;
    }
    const panelsHeightDiff = Math.abs(availableRecordsPanelHeight - selectedRecordsPanelHeight);
    const availableRecordsPanelDiff = availableRecordsPanelHeight > selectedRecordsPanelHeight ? panelsHeightDiff : 0;
    const selectedRecordsPanelDiff = selectedRecordsPanelHeight > availableRecordsPanelHeight ? panelsHeightDiff : 0;
    availableList.setHeight(availableHeight + selectedRecordsPanelDiff);
    selectedList.setHeight(selectedHeight + availableRecordsPanelDiff);
  }

}
