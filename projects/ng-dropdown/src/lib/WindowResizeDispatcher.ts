import {Inject, Injectable} from '@angular/core';
import {WindowToken} from './injectionTokens';
import {OverlayPanel} from './OverlayPanel';

export interface IWindow {
  addEventListener: (e: string, handler: (e: Event) => void, useCapture: boolean) => void;
  removeEventListener: (e: string, handler: (e: Event) => void, useCapture: boolean) => void;
}

@Injectable()
export class WindowResizeDispatcher {

  private listenResizeEvent = false;
  private panels: OverlayPanel[] = [];

  constructor(
    @Inject(WindowToken) private wnd: IWindow
  ) {
    this.handler = this.handler.bind(this);
  }

  private handler() {
    const overlays = this.panels.slice();
    for (let i = overlays.length - 1; i > -1; i--) {
      const overlayRef = overlays[i];
      if (!overlayRef.isAttached()) {
        continue;
      }
      overlayRef.close();
    }
  }

  private subscribe() {
    if (!this.listenResizeEvent) {
      this.listenResizeEvent = true;
      this.wnd.addEventListener('resize', this.handler, true);
      this.wnd.addEventListener('orientationchange', this.handler, true);
    }
  }

  private unsubscribe() {
    this.listenResizeEvent = false;
    this.wnd.removeEventListener('resize', this.handler, true);
    this.wnd.removeEventListener('orientationchange', this.handler, true);
  }

  public remove(panel: OverlayPanel): void {
    const index = this.panels.indexOf(panel);

    if (index > -1) {
      this.panels.splice(index, 1);
    }

    if (this.panels.length === 0) {
      this.unsubscribe();
    }
  }

  public add(p: OverlayPanel) {
    this.remove(p);
    this.panels.push(p);
    this.subscribe();
  }


}
