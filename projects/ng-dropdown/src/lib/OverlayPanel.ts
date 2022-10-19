import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';
import {of, Subject} from 'rxjs';
import {delay, filter, takeUntil} from 'rxjs/operators';
import {OverlayOutsideClickDispatcher} from './OverlayOutsideClickDispatcher';
import {WindowResizeDispatcher} from './WindowResizeDispatcher';

interface IOpenParams {
  attachTo: HTMLElement;
  openTrigger: HTMLElement;
  tmpl: TemplateRef<any>;
  origin: (element: HTMLElement) => DOMRect;
  width?: number;
  panelClass?: string | string[];
}

interface ConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';
  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';
  weight?: number;
  offsetX?: number;
  offsetY?: number;
  panelClass?: string | string[];
}

interface IOverlayParams {
  overlay: Overlay;
  outsideClicks: OverlayOutsideClickDispatcher;
  containerClass: string;
  positions: ConnectedPosition[];
  resize: WindowResizeDispatcher;
}

interface IPanelCreateParams {
  attachTo: HTMLElement;
  width: number;
  origin: (element: HTMLElement) => DOMRect;
  panelClass?: string | string[];
}

const createOrigin = (element: HTMLElement, origin: (element: HTMLElement) => DOMRect) => new Proxy(element, {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return new Proxy(target[prop], {
        apply: (t, thisArg, argumentsList) => {
          if (prop === 'getBoundingClientRect' && origin) {
            return origin(element);
          } else {
            return target[prop].apply(target, argumentsList);
          }
        }
      });
    } else {
      return Reflect.get(target, prop);
    }
  }
});

export class OverlayPanel {

  private ref?: OverlayRef;
  private viewContainerRef: ViewContainerRef;
  private readonly closed = new Subject();

  public readonly visibilityChange = new Subject<boolean>();
  public readonly outsidePointerEvents = new Subject<MouseEvent>();

  constructor(
    private params: IOverlayParams
  ) {
  }

  private resetMinHeight(ref: OverlayRef) {
    of(null).pipe(
      delay(0),
      takeUntil(this.closed)
    ).subscribe(_ => ref.updateSize({
      minHeight: 'auto'
    }));
  }

  private create(params: IPanelCreateParams): OverlayRef {
    const {overlay, positions} = this.params;
    const {origin, width, attachTo, panelClass} = params;
    const ref = overlay.create({
      positionStrategy: overlay
        .position()
        .flexibleConnectedTo(createOrigin(attachTo, origin))
        .withPositions(positions),
      width: width || attachTo.clientWidth,
      disposeOnNavigation: true,
      minHeight: 250,
      panelClass,
      scrollStrategy: overlay.scrollStrategies.reposition()
    });
    ref.attachments().subscribe(_ => {
      this.resetMinHeight(ref);
      this.visibilityChange.next(true);
    });
    ref.detachments().subscribe(_ => this.visibilityChange.next(false));
    return ref;
  }

  private attach(viewContainerRef: ViewContainerRef, tmpl: TemplateRef<any>): void {
    const overlay = this.ref;
    if (overlay) {
      overlay.attach(new TemplatePortal(
        tmpl,
        viewContainerRef
      ));
      this.params.outsideClicks.add(this);
      this.params.resize.add(this);
    }
  }

  public isAttached(): boolean {
    if (this.ref) {
      return this.ref.hasAttached();
    }
    return false;
  }

  public setViewContainerRef(ref: ViewContainerRef) {
    this.viewContainerRef = ref;
  }

  public containNode(target: Node): boolean {
    if (this.ref) {
      return this.ref.overlayElement.contains(target);
    }
    return false;
  }

  public open(params: IOpenParams): void {
    if (this.ref && this.ref.hasAttached()) {
      this.close();
      return;
    }
    this.ref = this.create({
      attachTo: params.attachTo,
      origin: params.origin,
      width: params.width,
      panelClass: params.panelClass
    });
    this.ref.hostElement.classList.add(this.params.containerClass);
    this.outsidePointerEvents.pipe(
      filter(e => !params.openTrigger.contains(e.target as HTMLElement)),
      takeUntil(this.closed)
    ).subscribe(_ => this.close());
    this.attach(this.viewContainerRef, params.tmpl);
  }

  public close(): void {
    if (this.ref) {
      this.ref.detach();
      this.ref.dispose();
      this.params.outsideClicks.remove(this);
      this.params.resize.remove(this);
      this.closed.next();
      this.ref = null;
    }
  }

  public dispose(): void {
    this.close();
    this.visibilityChange.complete();
    this.outsidePointerEvents.complete();
    this.closed.complete();
  }

}
