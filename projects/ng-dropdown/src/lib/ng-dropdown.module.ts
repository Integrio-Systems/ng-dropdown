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
import {GroupTmplDirective} from './directives/group-tmpl.directive';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ClearButtonTmplDirective} from './directives/clear-button-tmpl.directive';
import {SelectedRecordsButtonTmplDirective} from './directives/selected-records-button-tmpl.directive';
import {SpinnerTmplDirective} from './directives/spinner-tmpl.directive';
import {SelectedRecordsFilterDirective} from './directives/selected-records-filter.directive';
import {RecordsPanelComponent} from './records-panel/records-panel.component';
import {AvailableRecordsPanelDirective} from './directives/available-records-panel.directive';
import {SelectedRecordsPanelDirective} from './directives/selected-records-panel.directive';
import {SelectedRecordsFooterTmplDirective} from './directives/selected-records-footer-tmpl.directive';
import {SelectedRecordTmplDirective} from './directives/selected-record-tmpl.directive';
import {AvailableRecordsFilterDirective} from './directives/available-records-filter.directive';
import {BothRecordsPanelsComponent} from './both-records-panels/both-records-panels.component';
import {WindowToken} from './injectionTokens';
import {PanelResizerDirective} from './directives/panel-resizer.directive';
import {WindowResizeDispatcher} from './WindowResizeDispatcher';
import {OverlayOutsideClickDispatcher} from './OverlayOutsideClickDispatcher';
import {AvailableRecordsPanelScrollMonitorDirective} from './directives/available-records-panel-scroll-monitor.directive';
import {SelectedRecordsPanelScrollMonitorDirective} from './directives/selected-records-panel-scroll-monitor.directive';
import {NoAvailableRecordsTmplDirective} from './directives/no-available-records-tmpl.directive';
import {ObserversModule} from '@angular/cdk/observers';
import {VirtualScrollHookDirective} from './directives/virtual-scroll-hook.directive';
import {CombinedPanelResizerDirective} from './directives/combined-panel-resizer.directive';
import {DelayedAppearanceDirective} from './directives/delayed-appearance.directive';

export function windowFactory() {
  return window;
}

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ScrollingModule,
    ObserversModule
  ],
  declarations: [
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
    RecordsPanelComponent,
    AvailableRecordsPanelDirective,
    SelectedRecordsPanelDirective,
    SelectedRecordsFooterTmplDirective,
    SelectedRecordTmplDirective,
    AvailableRecordsFilterDirective,
    BothRecordsPanelsComponent,
    PanelResizerDirective,
    AvailableRecordsPanelScrollMonitorDirective,
    SelectedRecordsPanelScrollMonitorDirective,
    NoAvailableRecordsTmplDirective,
    VirtualScrollHookDirective,
    CombinedPanelResizerDirective,
    DelayedAppearanceDirective
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
    SelectedRecordsFooterTmplDirective,
    SelectedRecordTmplDirective,
    AvailableRecordsFilterDirective,
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
