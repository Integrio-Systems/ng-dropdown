import {AvailableRecordsPanelOverlayToken, CombinedPanelsOverlayToken, SelectedRecordsPanelOverlayToken} from '../injectionTokens';
import {Overlay} from '@angular/cdk/overlay';
import {OverlayOutsideClickDispatcher} from '../OverlayOutsideClickDispatcher';
import {OverlayPanel} from '../OverlayPanel';
import {FactoryProvider} from '@angular/core';
import {WindowResizeDispatcher} from '../WindowResizeDispatcher';

export function availablePanelOverlayFactory(
  o: Overlay,
  click: OverlayOutsideClickDispatcher,
  resize: WindowResizeDispatcher
) {
  return new OverlayPanel({
    overlay: o,
    outsideClicks: click,
    containerClass: 'ng-dropdown-available-records-panel-holder',
    positions: [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }
    ],
    resize
  });
}

export function selectionsPanelOverlayFactory(
  o: Overlay,
  click: OverlayOutsideClickDispatcher,
  resize: WindowResizeDispatcher
) {
  return new OverlayPanel({
    overlay: o,
    outsideClicks: click,
    containerClass: 'ng-dropdown-selected-records-panel-holder',
    positions: [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }
    ],
    resize
  });
}

export function bothPanelsOverlayFactory(
  o: Overlay,
  click: OverlayOutsideClickDispatcher,
  resize: WindowResizeDispatcher
) {
  return new OverlayPanel({
    overlay: o,
    outsideClicks: click,
    containerClass: 'ng-dropdown-mixed-panels-holder',
    positions: [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
      }
    ],
    resize
  });
}

const deps = [Overlay, OverlayOutsideClickDispatcher, WindowResizeDispatcher];

export const availableRecordsPanelProvider = {
  provide: AvailableRecordsPanelOverlayToken,
  deps,
  useFactory: availablePanelOverlayFactory
};

export const selectedRecordsPanelProvider: FactoryProvider = {
  provide: SelectedRecordsPanelOverlayToken,
  deps,
  useFactory: selectionsPanelOverlayFactory
};

export const bothRecordsPanelsProvider: FactoryProvider = {
  provide: CombinedPanelsOverlayToken,
  deps,
  useFactory: bothPanelsOverlayFactory
};



