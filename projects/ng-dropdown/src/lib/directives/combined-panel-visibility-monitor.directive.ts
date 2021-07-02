import {Directive, Inject, Input, OnChanges, Output} from '@angular/core';
import {MixedPanelsToken} from '../injectionTokens';
import {OverlayPanel} from '../OverlayPanel';
import {PanelVisibilityMonitorDirectiveBase} from './PanelVisibilityMonitorDirectiveBase';
import {SimpleChanges} from '../SimpleChanges';
import {Observable} from 'rxjs';

@Directive({
  selector: '[combinedPanelVisibilityMonitor]'
})
export class CombinedPanelVisibilityMonitorDirective extends PanelVisibilityMonitorDirectiveBase implements OnChanges {

  @Output()
  public readonly combinedPanelVisibilityChange = this.panel.visibilityChange;

  @Input()
  public combinedPanelHideSignal!: Observable<any>;

  constructor(
    @Inject(MixedPanelsToken) panel: OverlayPanel
  ) {
    super(panel);
  }

  public ngOnChanges(changes: SimpleChanges<CombinedPanelVisibilityMonitorDirective>): void {
    this.handleHideSignalChanges(changes.combinedPanelHideSignal);
  }

}
