import {
  Component,
  ContentChild,
  ElementRef, Inject,
  Input,
  OnChanges,
  OnDestroy, OnInit,
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
  AvailableRecordsPanelToken,
  MixedPanelsToken,
  SelectedRecordsHolderToken,
  SelectedRecordsPanelToken
} from '../injectionTokens';
import {availableRecordsPanelProvider, bothRecordsPanelsProvider, selectedRecordsPanelProvider} from './panelProviders';
import {Defaults} from '../Defaults';
import {NoAvailableRecordsTmplDirective} from '../directives/no-available-records-tmpl.directive';

export function availableRecordsFactory(): AvailableRecords {
  return new AvailableRecords();
}

export function selectedRecordsFactory(): SelectedRecords {
  return new SelectedRecords();
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
    Defaults,
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
    @Inject(AvailableRecordsPanelToken) public readonly availableRecordsPanel: OverlayPanel,
    @Inject(SelectedRecordsPanelToken) public readonly selectedRecordsPanel: OverlayPanel,
    @Inject(MixedPanelsToken) public readonly mixedPanel: OverlayPanel,
    @Inject(SelectedRecordsHolderToken) selected: SelectedRecords,
    @Inject(AvailableRecordsHolderToken) public readonly availableRecords: FilterableRecords,
    private defaults: Defaults,
    vc: ViewContainerRef
  ) {
    super(selected);
    availableRecordsPanel.setViewContainerRef(vc);
    selectedRecordsPanel.setViewContainerRef(vc);
    mixedPanel.setViewContainerRef(vc);
  }

  public ngOnInit(): void {
    this.selectedRecords.setValueBinder(this.bindValue);
    this.selectedRecords.setRecordComparer(this.recordComparer);
  }

  public showSelectedItemsPanel = (): void => {
    this.selectedRecordsPanel.open({
      openTrigger: this.selectedRecordsButton.nativeElement,
      attachTo: this.dropdown.nativeElement,
      tmpl: this.selectedRecordsPanelTmpl
    });
  };

  public showItemsPanel(): void {
    const dropdown = this.dropdown.nativeElement;
    if (this.compact || !this.multi) {
      this.availableRecordsPanel.open({
        openTrigger: this.selectionTrigger.nativeElement,
        attachTo: dropdown,
        tmpl: this.availableRecordsPanelTmpl
      });
    } else {
      const size = dropdown.getBoundingClientRect();
      const {panelMinWidth} = this.defaults;
      this.mixedPanel.open({
        openTrigger: this.selectionTrigger.nativeElement,
        attachTo: dropdown,
        tmpl: this.bothRecordPanelsTmpl,
        width: size.width > panelMinWidth ? size.width : size.width * 2
      });
    }
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
