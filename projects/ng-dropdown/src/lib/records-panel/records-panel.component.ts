import {Component, Input, TemplateRef, OnChanges, SimpleChanges, HostBinding} from '@angular/core';

@Component({
  selector: 'records-panel',
  templateUrl: './records-panel.component.html',
  styleUrls: ['./records-panel.component.scss']
})
export class RecordsPanelComponent implements OnChanges {

  public records!: any[];

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

  @HostBinding('class.empty')
  public noRecords = false;

  public ngOnChanges(changes: SimpleChanges): void {
    this.records = Array.isArray(this.items) ? this.items : [];
    this.noRecords = this.records.length === 0;
  }
}
