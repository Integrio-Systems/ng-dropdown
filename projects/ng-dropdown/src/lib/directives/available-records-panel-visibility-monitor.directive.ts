import {Directive, Inject, Input, OnChanges, Output} from '@angular/core';
import {PanelVisibilityMonitorDirectiveBase} from './PanelVisibilityMonitorDirectiveBase';
import {AvailableRecordsPanelToken} from '../injectionTokens';
import {OverlayPanel} from '../OverlayPanel';
import {Observable} from 'rxjs';
import {SimpleChanges} from '../SimpleChanges';

@Directive({
  selector: '[availableRecordsPanelVisibilityMonitor]'
})
export class AvailableRecordsPanelVisibilityMonitorDirective extends PanelVisibilityMonitorDirectiveBase implements OnChanges {

  @Input()
  public availableRecordsPanelHideSignal!: Observable<any>;

  @Output()
  public readonly availableRecordsPanelVisibilityChange = this.panel.visibilityChange;

  constructor(
    @Inject(AvailableRecordsPanelToken) panel: OverlayPanel
  ) {
    super(panel);
  }

  public ngOnChanges(changes: SimpleChanges<AvailableRecordsPanelVisibilityMonitorDirective>): void {
    this.handleHideSignalChanges(changes.availableRecordsPanelHideSignal);
  }

}
