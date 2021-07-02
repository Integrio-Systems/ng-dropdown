import {ScrollControl} from '../ScrollControl';
import {PanelHeight} from '../PanelHeight';

export function scrollControlFactory() {
  return new ScrollControl();
}

export function existedScrollControl(sc: ScrollControl) {
  return sc;
}

export function existedOrNewPanelHeightChangeTrigger(h: PanelHeight) {
  return h || new PanelHeight();
}
