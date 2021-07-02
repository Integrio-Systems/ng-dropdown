import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import {OverlayPanel} from './OverlayPanel';

@Injectable()
export class OverlayOutsideClickDispatcher {

  private cursorOriginalValue?: string;
  private cursorStyleIsSet = false;
  private attachedOverlays: OverlayPanel[] = [];
  private isAttached?: boolean;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private platform: Platform
  ) {
  }

  public remove(overlayRef: OverlayPanel): void {
    const index = this.attachedOverlays.indexOf(overlayRef);

    if (index > -1) {
      this.attachedOverlays.splice(index, 1);
    }

    // Remove the global listener once there are no more overlays.
    if (this.attachedOverlays.length === 0) {
      this.detach();
    }
  }

  public add(overlayRef: OverlayPanel): void {
    this.remove(overlayRef);
    this.attachedOverlays.push(overlayRef);

    // tslint:disable: max-line-length
    // Safari on iOS does not generate click events for non-interactive
    // elements. However, we want to receive a click for any element outside
    // the overlay. We can force a "clickable" state by setting
    // `cursor: pointer` on the document body.
    // See https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#Safari_Mobile
    // and https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
    // tslint:enable: max-line-length
    if (!this.isAttached) {
      this.document.body.addEventListener('click', this.clickListener, true);
      this.document.body.addEventListener('contextmenu', this.clickListener, true);

      // click event is not fired on iOS. To make element "clickable" we are
      // setting the cursor to pointer
      if (this.platform.IOS && !this.cursorStyleIsSet) {
        this.cursorOriginalValue = this.document.body.style.cursor;
        this.document.body.style.cursor = 'pointer';
        this.cursorStyleIsSet = true;
      }

      this.isAttached = true;
    }
  }

  private detach(): void {
    if (this.isAttached) {
      this.document.body.removeEventListener('click', this.clickListener, true);
      this.document.body.removeEventListener('contextmenu', this.clickListener, true);
      if (this.platform.IOS && this.cursorStyleIsSet) {
        this.document.body.style.cursor = this.cursorOriginalValue;
        this.cursorStyleIsSet = false;
      }
      this.isAttached = false;
    }
  }

  /** Click event listener that will be attached to the body propagate phase. */
  private clickListener = (event: MouseEvent) => {
    // Get the target through the `composedPath` if possible to account for shadow DOM.
    const target = event.composedPath ? event.composedPath()[0] : event.target;
    // We copy the array because the original may be modified asynchronously if the
    // outsidePointerEvents listener decides to detach overlays resulting in index errors inside
    // the for loop.
    const overlays = this.attachedOverlays.slice();

    // Dispatch the mouse event to the top overlay which has subscribers to its mouse events.
    // We want to target all overlays for which the click could be considered as outside click.
    // As soon as we reach an overlay for which the click is not outside click we break off
    // the loop.
    for (let i = overlays.length - 1; i > -1; i--) {
      const overlayRef = overlays[i];
      if (overlayRef.outsidePointerEvents.observers.length < 1 || !overlayRef.isAttached()) {
        continue;
      }

      // If it's a click inside the overlay, just break - we should do nothing
      // If it's an outside click dispatch the mouse event, and proceed with the next overlay
      if (overlayRef.containNode(target as Node)) {
        break;
      }

      overlayRef.outsidePointerEvents.next(event);
    }
  };
}
