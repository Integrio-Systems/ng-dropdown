import {Directive, Inject, Input, OnChanges, Output} from '@angular/core';
import {PanelVisibilityMonitorDirectiveBase} from './PanelVisibilityMonitorDirectiveBase';
import {SimpleChanges} from '../SimpleChanges';
import {SelectedRecordsPanelToken} from '../injectionTokens';
import {OverlayPanel} from '../OverlayPanel';
import {Observable} from 'rxjs';

@Directive({
  selector: '[selectedRecordsPanelVisibilityMonitor]'
})
export class SelectedRecordsPanelVisibilityMonitorDirective extends PanelVisibilityMonitorDirectiveBase implements OnChanges {

  @Output()
  public readonly selectedRecordsPanelVisibilityChange = this.panel.visibilityChange;

  @Input()
  public selectedRecordsPanelHideSignal!: Observable<any>;

  constructor(
    @Inject(SelectedRecordsPanelToken) panel: OverlayPanel
  ) {
    super(panel);
  }

  public ngOnChanges(changes: SimpleChanges<SelectedRecordsPanelVisibilityMonitorDirective>): void {
    this.handleHideSignalChanges(changes.selectedRecordsPanelHideSignal);
  }

}
