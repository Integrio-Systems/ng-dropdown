import {Component, ContentChild} from '@angular/core';
import {AvailableRecordsPanelDirective} from '../directives/available-records-panel.directive';
import {SelectedRecordsPanelDirective} from '../directives/selected-records-panel.directive';

@Component({
  selector: 'both-records-panels',
  templateUrl: './both-records-panels.component.html',
  styleUrls: ['./both-records-panels.component.scss']
})
export class BothRecordsPanelsComponent {

  @ContentChild(AvailableRecordsPanelDirective, {static: false})
  public availableRecordsPanel: AvailableRecordsPanelDirective;

  @ContentChild(SelectedRecordsPanelDirective, {static: false})
  public selectedRecordsPanel: SelectedRecordsPanelDirective;

}
