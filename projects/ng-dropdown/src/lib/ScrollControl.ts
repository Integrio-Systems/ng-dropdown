import {EventEmitter} from '@angular/core';
import {IScrollInfo} from './IScrollInfo';
import {Subject} from 'rxjs';

export class ScrollControl {
  public readonly scrollEmitter = new EventEmitter<IScrollInfo>();
  public readonly scrollReceiver = new Subject<number>();

  public dispose() {
    this.scrollEmitter.complete();
    this.scrollReceiver.complete();
  }
}
