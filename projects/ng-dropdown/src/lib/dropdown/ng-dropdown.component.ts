import {
  Component,
  ContentChild,
  ElementRef, EventEmitter, Inject,
  Input,
  OnChanges,
  OnDestroy, OnInit, Optional, Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AvailableRecordTmplDirective} from '../directives/available-record-tmpl.directive';
import {SelectedRecords, ValueBinder, ValueMode} from '../SelectedRecords';
import {NgDropdownControlValueAccessor} from '../NgDropdownControlValueAccessor';
import {LabelTemplateDirective} from '../directives/label-template.directive';
import {AvailableRecordsHeaderTmplDirective} from '../directives/available-records-header-tmpl.directive';
import {AvailableRecordsFooterTmplDirective} from '../directives/available-records-footer-tmpl.directive';
import {SelectedRecordsHeaderTmplDirective} from '../directives/selected-records-header-tmpl.directive';
import {NoSelectedRecordsTmplDirective} from '../directives/no-selected-records-tmpl.directive';
import {GroupTmplDirective} from '../directives/group-tmpl.directive';
import {ClearButtonTmplDirective} from '../directives/clear-button-tmpl.directive';
import {SelectedRecordsButtonTmplDirective} from '../directives/selected-records-button-tmpl.directive';
import {SpinnerTmplDirective} from '../directives/spinner-tmpl.directive';
import {SelectedRecordsFooterTmplDirective} from '../directives/selected-records-footer-tmpl.directive';
import {OverlayPanel} from '../OverlayPanel';
import {SelectedRecordTmplDirective} from '../directives/selected-record-tmpl.directive';
import {SimpleChanges} from '../SimpleChanges';
import {FilterableRecords} from '../FilterableRecords';
import {AvailableRecords} from '../AvailableRecords';
import {
  AvailableRecordsHolderToken,
  AvailableRecordsPanelOverlayToken, AvailableRecordsVirtualScrollHolderToken,
  CombinedPanelsOverlayToken, Defaults,
  SelectedRecordsHolderToken,
  SelectedRecordsPanelOverlayToken, SelectedRecordsVirtualScrollHolderToken
} from '../injectionTokens';
import {availableRecordsPanelProvider, bothRecordsPanelsProvider, selectedRecordsPanelProvider} from './panelProviders';
import {NgDropdownInternals} from '../NgDropdownInternals';
import {NoAvailableRecordsTmplDirective} from '../directives/no-available-records-tmpl.directive';
import {VirtualScrollHolder} from '../VirtualScrollHolder';
import {RecordTrackerProperty} from '../RecordTrackerProperty';
import {Observable} from 'rxjs';

export function availableRecordsFactory(): AvailableRecords {
  return new AvailableRecords();
}

export function selectedRecordsFactory(): SelectedRecords {
  return new SelectedRecords();
}

export function scrollHolderFactory() {
  return new VirtualScrollHolder();
}

export function defaultsFactory(supplied: NgDropdownInternals) {
  return supplied || new NgDropdownInternals();
}

@Component({
  selector: 'ng-dropdown',
  templateUrl: './ng-dropdown.component.html',
  styleUrls: ['./ng-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NgDropdownComponent
    },
    {
      provide: AvailableRecordsHolderToken,
      useFactory: availableRecordsFactory
    },
    {
      provide: SelectedRecordsHolderToken,
      useFactory: selectedRecordsFactory
    },
    {
      provide: AvailableRecordsVirtualScrollHolderToken,
      useFactory: scrollHolderFactory
    },
    {
      provide: SelectedRecordsVirtualScrollHolderToken,
      useFactory: scrollHolderFactory
    },
    {
      provide: Defaults,
      useFactory: defaultsFactory,
      deps: [[new Optional(), NgDropdownInternals]]
    },
    availableRecordsPanelProvider,
    selectedRecordsPanelProvider,
    bothRecordsPanelsProvider
  ]
})
export class NgDropdownComponent extends NgDropdownControlValueAccessor implements OnChanges, OnDestroy, OnInit {

  @Input()
  public multi = false;

  @Input()
  public bindLabel?: string;

  @Input()
  public bindValue?: ValueBinder;

  @Input()
  public closeAfterSelect = true;

  @Input()
  public records: any[] = [];

  @Input()
  public compact: boolean;

  @Input()
  public clearable = true;

  @Input()
  public placeholder?: string;

  @Input()
  public loading?: boolean;

  @Input()
  public groupBy?: string;

  @Input()
  public showSelected = true;

  @Input()
  public defaultClearButtonTitle = '';

  @Input()
  public defaultSelectedRecordsButtonTitle = '';

  @Input()
  public recordComparer?: (a: any, b: any) => boolean;

  @Input()
  public panelCssClass: string;

  @Input()
  public openManually: boolean;

  @Input()
  public recordTrackerProperty: RecordTrackerProperty;

  @Output()
  public availableRecordsPanelOpen = new EventEmitter();

  @Output()
  public availableRecordsPanelClose = new EventEmitter();

  @Output()
  public selectedRecordsPanelOpen = new EventEmitter();

  @Output()
  public selectedRecordsPanelClose = new EventEmitter();

  @Output()
  public combinedPanelOpen = new EventEmitter();

  @Output()
  public combinedPanelClose = new EventEmitter();

  @Output()
  public manualOpen = new EventEmitter();

  @ViewChild('dropdown', {static: false})
  public dropdown!: ElementRef<HTMLElement>;

  @ViewChild('availableRecordsPanelTmpl', {static: false})
  public availableRecordsPanelTmpl!: TemplateRef<any>;

  @ViewChild('selectedRecordsPanelTmpl', {static: false})
  public selectedRecordsPanelTmpl!: TemplateRef<any>;

  @ViewChild('bothRecordPanelsTmpl', {static: false})
  public bothRecordPanelsTmpl!: TemplateRef<any>;

  @ViewChild('selectionTrigger', {static: false})
  public selectionTrigger!: ElementRef<HTMLElement>;

  @ViewChild('selectedRecordsButton', {static: false})
  public selectedRecordsButton!: ElementRef<HTMLElement>;

  @ContentChild(AvailableRecordTmplDirective, {static: false})
  public availableRecordTmpl?: AvailableRecordTmplDirective;

  @ContentChild(SelectedRecordTmplDirective, {static: false})
  public selectedRecordTmpl?: SelectedRecordTmplDirective;

  @ContentChild(LabelTemplateDirective, {static: false})
  public labelTmpl?: LabelTemplateDirective;

  @ContentChild(AvailableRecordsHeaderTmplDirective, {static: false})
  public availableRecordsHeaderTmpl?: AvailableRecordsHeaderTmplDirective;

  @ContentChild(AvailableRecordsFooterTmplDirective, {static: false})
  public availableRecordsFooterTmpl?: AvailableRecordsFooterTmplDirective;

  @ContentChild(SelectedRecordsHeaderTmplDirective, {static: false})
  public selectedRecordsHeaderTmpl?: SelectedRecordsHeaderTmplDirective;

  @ContentChild(SelectedRecordsFooterTmplDirective, {static: false})
  public selectedRecordsFooterTmpl?: SelectedRecordsFooterTmplDirective;

  @ContentChild(NoSelectedRecordsTmplDirective, {static: false})
  public noSelectedRecordsTmpl?: NoSelectedRecordsTmplDirective;

  @ContentChild(NoAvailableRecordsTmplDirective, {static: false})
  public noAvailableRecordsTmpl?: NoAvailableRecordsTmplDirective;

  @ContentChild(GroupTmplDirective, {static: false})
  public groupTmpl?: GroupTmplDirective;

  @ContentChild(ClearButtonTmplDirective, {static: false})
  public clearButtonTmpl?: ClearButtonTmplDirective;

  @ContentChild(SpinnerTmplDirective, {static: false})
  public spinnerTmpl?: SpinnerTmplDirective;

  @ContentChild(SelectedRecordsButtonTmplDirective, {static: false})
  public selectedRecordsButtonTmpl?: SelectedRecordsButtonTmplDirective;

  constructor(
    @Inject(AvailableRecordsPanelOverlayToken) private readonly availableRecordsPanel: OverlayPanel,
    @Inject(SelectedRecordsPanelOverlayToken) public readonly selectedRecordsPanel: OverlayPanel,
    @Inject(CombinedPanelsOverlayToken) private readonly mixedPanel: OverlayPanel,
    @Inject(SelectedRecordsHolderToken) selected: SelectedRecords,
    @Inject(AvailableRecordsHolderToken) public readonly availableRecords: FilterableRecords,
    @Inject(Defaults) private defaults: NgDropdownInternals,
    vc: ViewContainerRef
  ) {
    super(selected);
    availableRecordsPanel.setViewContainerRef(vc);
    selectedRecordsPanel.setViewContainerRef(vc);
    mixedPanel.setViewContainerRef(vc);
    this.triggerVisibilityChange(availableRecordsPanel.visibilityChange, this.availableRecordsPanelOpen, this.availableRecordsPanelClose);
    this.triggerVisibilityChange(selectedRecordsPanel.visibilityChange, this.selectedRecordsPanelOpen, this.selectedRecordsPanelClose);
    this.triggerVisibilityChange(mixedPanel.visibilityChange, this.combinedPanelOpen, this.combinedPanelClose);
  }

  private triggerVisibilityChange(source: Observable<boolean>, open: EventEmitter<void>, close: EventEmitter<void>) {
    source.subscribe(v => {
      if (v) {
        open.emit();
      } else {
        close.emit();
      }
    });
  }

  public ngOnInit(): void {
    this.selectedRecords.setValueBinder(this.bindValue);
    this.selectedRecords.setRecordComparer(this.recordComparer);
  }

  public showSelectedItemsPanel = (): void => {
    if (this.compact) {
      this.selectedRecordsPanel.open({
        openTrigger: this.selectedRecordsButton.nativeElement,
        attachTo: this.dropdown.nativeElement,
        tmpl: this.selectedRecordsPanelTmpl,
        width: this.defaults.getSinglePanelWidth(this.dropdown),
        origin: this.defaults.originPoint,
        panelClass: [this.panelCssClass, 'selectedItemsPanel']
      });
    }
  };

  private showAvailableRecordsPanel = () => {
    this.availableRecordsPanel.open({
      openTrigger: this.selectionTrigger.nativeElement,
      attachTo: this.dropdown.nativeElement,
      tmpl: this.availableRecordsPanelTmpl,
      width: this.defaults.getSinglePanelWidth(this.dropdown),
      origin: this.defaults.originPoint,
      panelClass: [this.panelCssClass, 'availableRecordsPanel']
    });
  };

  private showCombinedPanel = () => {
    const dropdown = this.dropdown.nativeElement;
    this.mixedPanel.open({
      openTrigger: this.selectionTrigger.nativeElement,
      attachTo: dropdown,
      tmpl: this.bothRecordPanelsTmpl,
      width: this.defaults.getCombinedPanelWidth(this.dropdown),
      origin: this.defaults.originPoint,
      panelClass: [this.panelCssClass, 'combinedPanel']
    });
  };

  public open() {
    if (this.compact || !this.multi) {
      this.showAvailableRecordsPanel();
    } else {
      this.showCombinedPanel();
    }
  }

  public showItemsPanel(): void {
    if (this.openManually) {
      this.manualOpen.emit();
    } else {
      this.open();
    }
  }

  public close() {
    this.mixedPanel.close();
    this.availableRecordsPanel.close();
    this.selectedRecordsPanel.close();
  }

  public recordSelect = (record: any): void => {
    if (!this.disabled) {
      this.selectedRecords.select(record);
      this.updateValue();
      if (this.closeAfterSelect && this.availableRecordsPanel) {
        this.availableRecordsPanel.close();
      }
    }
  };

  public recordDeselect = (record: any): void => {
    if (!this.disabled) {
      this.selectedRecords.select(record);
      this.updateValue();
      if (this.selectedRecords.isEmpty && this.selectedRecordsPanel) {
        this.selectedRecordsPanel.close();
      }
    }
  };

  public clear = (): void => {
    if (!this.disabled) {
      this.selectedRecords.clear();
      this.updateValue();
    }
  };

  public ngOnChanges(changes: SimpleChanges<NgDropdownComponent>): void {
    if (changes.multi && changes.multi.previousValue !== this.multi) {
      this.selectedRecords.setMode(this.multi ? ValueMode.multi : ValueMode.single);
      this.updateValue();
    }
    this.availableRecords.setAllRecords(this.records);
    this.selectedRecords.setAllRecords(this.records);
  }

  public ngOnDestroy(): void {
    this.selectedRecords.dispose();
    this.availableRecords.dispose();
    this.selectedRecordsPanel.dispose();
    this.availableRecordsPanel.dispose();
  }

}
