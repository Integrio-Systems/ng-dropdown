import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {EventEmitter, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';
import {of, Subject} from 'rxjs';
import {delay, filter, takeUntil} from 'rxjs/operators';
import {OverlayOutsideClickDispatcher} from './OverlayOutsideClickDispatcher';
import {WindowResizeDispatcher} from './WindowResizeDispatcher';

interface IOpenParams {
  attachTo: HTMLElement;
  openTrigger: HTMLElement;
  tmpl: TemplateRef<any>;
  width?: string | number;
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

export class OverlayPanel {

  private ref?: OverlayRef;
  private viewContainerRef: ViewContainerRef;
  private readonly closed = new Subject();

  public readonly visibilityChange = new EventEmitter<boolean>();
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

  private create(attachTo: HTMLElement, width?: string | number): OverlayRef {
    const {overlay, positions} = this.params;
    const ref = overlay.create({
      positionStrategy: overlay
        .position()
        .flexibleConnectedTo(attachTo)
        .withPositions(positions),
      width: width || attachTo.clientWidth,
      disposeOnNavigation: true,
      minHeight: 250,
      scrollStrategy: overlay.scrollStrategies.reposition()
    });
    ref.attachments().subscribe(_ => {
      this.resetMinHeight(ref);
      this.visibilityChange.emit(true);
    });
    ref.detachments().subscribe(_ => this.visibilityChange.emit(false));
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
    this.ref = this.create(params.attachTo, params.width);
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
