import {Component, Input, TemplateRef, OnChanges, Inject, HostBinding, Optional} from '@angular/core';
import {NgDropdownInternals} from '../NgDropdownInternals';
import {createPropertySelector, PropertySelector, RecordTrackerProperty} from '../RecordTrackerProperty';
import {Defaults, ScrollStrategyFactory} from '../injectionTokens';
import {IItemsHolder} from './IItemsHolder';
import {FlatItemsHolder} from './FlatItemsHolder';
import {GroupedItemsHolder} from './GroupedItemsHolder';
import {SimpleChanges} from '../SimpleChanges';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY, VirtualScrollStrategy} from '@angular/cdk/scrolling';

export function scrollStrategyFactory(f: () => VirtualScrollStrategy) {
  return f ? f() : new FixedSizeVirtualScrollStrategy(20, 100, 200);
}

@Component({
  selector: 'records-panel',
  templateUrl: './records-panel.component.html',
  styleUrls: ['./records-panel.component.scss'],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: scrollStrategyFactory,
      deps: [[new Optional(), ScrollStrategyFactory]]
    }
  ]
})
export class RecordsPanelComponent implements OnChanges {

  private propertySelector: PropertySelector;

  public recordsHolder: IItemsHolder;

  @Input()
  public items?: ReadonlyArray<any> | any[] | null;

  @Input()
  public groupBy?: string;

  @Input()
  public headerTmpl?: TemplateRef<any> | null;

  @Input()
  public footerTmpl?: TemplateRef<any> | null;

  @Input()
  public emptyTmpl?: TemplateRef<any> | null;

  @Input()
  public groupTmpl!: TemplateRef<any> | null;

  @Input()
  public itemTmpl!: TemplateRef<any> | null;

  @Input()
  public selected?: (record: any) => boolean;

  @Input()
  public selectAction?: (record: any) => void;

  @Input()
  public recordTrackerProperty: RecordTrackerProperty;

  @HostBinding('class.empty')
  public noRecords = false;

  constructor(
    @Inject(Defaults) public defaults: NgDropdownInternals
  ) {
  }

  public recordTracker = (index, record: any) => {
    if (this.recordsHolder.isGroup(record)) {
      return record.name;
    } else if (this.propertySelector) {
      return this.propertySelector(record);
    } else {
      return index;
    }
  };

  public ngOnChanges(changes: SimpleChanges<RecordsPanelComponent>): void {
    const records = Array.isArray(this.items) ? this.items : [];
    this.noRecords = records.length === 0;
    if (changes.items && changes.items.previousValue !== this.items) {
      this.recordsHolder = !this.groupBy ? new FlatItemsHolder(records) : new GroupedItemsHolder(records, this.groupBy);
    }
    if (changes.recordTrackerProperty && changes.recordTrackerProperty.previousValue !== this.recordTrackerProperty) {
      this.propertySelector = createPropertySelector(this.recordTrackerProperty);
    }
  }
}
