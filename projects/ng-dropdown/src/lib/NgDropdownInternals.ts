import {ElementRef} from '@angular/core';

export class NgDropdownInternals {
  public listHeight: number;
  public combinedPanelWidthLimit: number;
  public calculateCombinedPanelWidth: (element: ElementRef<HTMLElement>) => number;
  public calculateSinglePanelWidth: (element: ElementRef<HTMLElement>) => number;
  public originPoint: (element: HTMLElement) => DOMRect;
  public cdkVirtualForTemplateCacheSize: number;
  public panelShowDelay: number;

  constructor(config: Partial<NgDropdownInternals> = {}) {
    this.listHeight = config.listHeight || 250;
    this.combinedPanelWidthLimit = config.combinedPanelWidthLimit || 600;
    this.calculateCombinedPanelWidth = config.calculateCombinedPanelWidth || undefined;
    this.calculateSinglePanelWidth = config.calculateSinglePanelWidth || undefined;
    this.originPoint = config.originPoint || undefined;
    this.cdkVirtualForTemplateCacheSize = config.cdkVirtualForTemplateCacheSize || 20;
    this.panelShowDelay = config.panelShowDelay || 50;
  }

  public getCombinedPanelWidth(element: ElementRef<HTMLElement>): number {
    const dropdownWidth = element.nativeElement.getBoundingClientRect().width;
    const {combinedPanelWidthLimit, calculateCombinedPanelWidth} = this;
    if (calculateCombinedPanelWidth) {
      return calculateCombinedPanelWidth(element);
    } else if (dropdownWidth >= combinedPanelWidthLimit) {
      return dropdownWidth;
    } else {
      return dropdownWidth * 2;
    }
  }

  public getSinglePanelWidth(element: ElementRef<HTMLElement>): number {
    if (this.calculateSinglePanelWidth) {
      return this.calculateSinglePanelWidth(element);
    } else {
      return element.nativeElement.getBoundingClientRect().width;
    }
  }
}
