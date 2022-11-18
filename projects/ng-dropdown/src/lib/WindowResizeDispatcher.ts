import {Inject, Injectable} from '@angular/core';
import {WindowToken} from './injectionTokens';
import {OverlayPanel} from './OverlayPanel';

export interface IWindow {
  addEventListener: (e: string, handler: (e: Event) => void, useCapture: boolean) => void;
  removeEventListener: (e: string, handler: (e: Event) => void, useCapture: boolean) => void;
  outerWidth: number;
}

@Injectable()
export class WindowResizeDispatcher {

  private readonly panels: OverlayPanel[] = [];

  private currentWidth: number;

  constructor(
    @Inject(WindowToken) private wnd: IWindow
  ) {
    this.handler = this.handler.bind(this);
    this.currentWidth = wnd.outerWidth;
    this.subscribe();
  }

  private handler() {
    const widthChanged = this.currentWidth !== this.wnd.outerWidth;
    this.currentWidth = this.wnd.outerWidth;
    if (widthChanged) {
      const overlays = this.panels.slice();
      for (let i = overlays.length - 1; i > -1; i--) {
        const overlayRef = overlays[i];
        if (!overlayRef.isAttached()) {
          continue;
        }
        overlayRef.close();
      }
    }
  }

  private subscribe() {
    this.wnd.addEventListener('resize', this.handler, true);
    this.wnd.addEventListener('orientationchange', this.handler, true);
  }

  public remove(panel: OverlayPanel): void {
    const index = this.panels.indexOf(panel);
    if (index > -1) {
      this.panels.splice(index, 1);
    }
  }

  public add(p: OverlayPanel) {
    this.remove(p);
    this.panels.push(p);
  }

}
