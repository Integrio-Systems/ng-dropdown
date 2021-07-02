import {NgModule} from '@angular/core';
import {NgDropdownComponent} from './dropdown/ng-dropdown.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {AvailableRecordTmplDirective} from './directives/available-record-tmpl.directive';
import {LabelTemplateDirective} from './directives/label-template.directive';
import {AvailableRecordsHeaderTmplDirective} from './directives/available-records-header-tmpl.directive';
import {AvailableRecordsFooterTmplDirective} from './directives/available-records-footer-tmpl.directive';
import {SelectedRecordsHeaderTmplDirective} from './directives/selected-records-header-tmpl.directive';
import {NoSelectedRecordsTmplDirective} from './directives/no-selected-records-tmpl.directive';
import {GroupByPipe} from './group-by.pipe';
import {GroupTmplDirective} from './directives/group-tmpl.directive';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ListResizeNotifierDirective} from './directives/list-resize-notifier.directive';
import {ClearButtonTmplDirective} from './directives/clear-button-tmpl.directive';
import {SelectedRecordsButtonTmplDirective} from './directives/selected-records-button-tmpl.directive';
import {SpinnerTmplDirective} from './directives/spinner-tmpl.directive';
import {SelectedRecordsFilterDirective} from './directives/selected-records-filter.directive';
import {RecordsPanelComponent} from './records-panel/records-panel.component';
import {ScrollListenerDirective} from './directives/scroll-listener.directive';
import {AvailableRecordsPanelDirective} from './directives/available-records-panel.directive';
import {SelectedRecordsPanelDirective} from './directives/selected-records-panel.directive';
import {ScrollTopDirective} from './directives/scroll-top.directive';
import {SelectedRecordsFooterTmplDirective} from './directives/selected-records-footer-tmpl.directive';
import {SelectedRecordTmplDirective} from './directives/selected-record-tmpl.directive';
import {AvailableRecordsFilterDirective} from './directives/available-records-filter.directive';
import {BothRecordsPanelsComponent} from './both-records-panels/both-records-panels.component';
import {WindowToken} from './injectionTokens';
import {PanelResizerDirective} from './directives/panel-resizer.directive';
import {WindowResizeDispatcher} from './WindowResizeDispatcher';
import {OverlayOutsideClickDispatcher} from './OverlayOutsideClickDispatcher';
import {CombinedPanelVisibilityMonitorDirective} from './directives/combined-panel-visibility-monitor.directive';
import {AvailableRecordsPanelVisibilityMonitorDirective} from './directives/available-records-panel-visibility-monitor.directive';
import {SelectedRecordsPanelVisibilityMonitorDirective} from './directives/selected-records-panel-visibility-monitor.directive';
import {AvailableRecordsPanelScrollMonitorDirective} from './directives/available-records-panel-scroll-monitor.directive';
import {SelectedRecordsPanelScrollMonitorDirective} from './directives/selected-records-panel-scroll-monitor.directive';
import {NoAvailableRecordsTmplDirective} from './directives/no-available-records-tmpl.directive';

export function windowFactory() {
  return window;
}

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ScrollingModule
  ],
  declarations: [
    NgDropdownComponent,
    AvailableRecordTmplDirective,
    LabelTemplateDirective,
    AvailableRecordsHeaderTmplDirective,
    AvailableRecordsFooterTmplDirective,
    SelectedRecordsHeaderTmplDirective,
    NoSelectedRecordsTmplDirective,
    GroupByPipe,
    GroupTmplDirective,
    ListResizeNotifierDirective,
    ClearButtonTmplDirective,
    SelectedRecordsButtonTmplDirective,
    SpinnerTmplDirective,
    SelectedRecordsFilterDirective,
    RecordsPanelComponent,
    ScrollListenerDirective,
    AvailableRecordsPanelDirective,
    SelectedRecordsPanelDirective,
    ScrollTopDirective,
    SelectedRecordsFooterTmplDirective,
    SelectedRecordTmplDirective,
    AvailableRecordsFilterDirective,
    BothRecordsPanelsComponent,
    PanelResizerDirective,
    CombinedPanelVisibilityMonitorDirective,
    AvailableRecordsPanelVisibilityMonitorDirective,
    SelectedRecordsPanelVisibilityMonitorDirective,
    AvailableRecordsPanelScrollMonitorDirective,
    SelectedRecordsPanelScrollMonitorDirective,
    NoAvailableRecordsTmplDirective
  ],
  exports: [
    NgDropdownComponent,
    AvailableRecordTmplDirective,
    LabelTemplateDirective,
    AvailableRecordsHeaderTmplDirective,
    AvailableRecordsFooterTmplDirective,
    SelectedRecordsHeaderTmplDirective,
    NoSelectedRecordsTmplDirective,
    GroupTmplDirective,
    ClearButtonTmplDirective,
    SelectedRecordsButtonTmplDirective,
    SpinnerTmplDirective,
    SelectedRecordsFilterDirective,
    ScrollListenerDirective,
    SelectedRecordsFooterTmplDirective,
    SelectedRecordTmplDirective,
    AvailableRecordsFilterDirective,
    CombinedPanelVisibilityMonitorDirective,
    AvailableRecordsPanelVisibilityMonitorDirective,
    SelectedRecordsPanelVisibilityMonitorDirective,
    AvailableRecordsPanelScrollMonitorDirective,
    SelectedRecordsPanelScrollMonitorDirective,
    NoAvailableRecordsTmplDirective
  ],
  providers: [
    {
      provide: WindowToken,
      useFactory: windowFactory
    },
    WindowResizeDispatcher,
    OverlayOutsideClickDispatcher
  ]
})
export class NgDropdownModule {
}
