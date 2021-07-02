import {ControlValueAccessor} from '@angular/forms';
import {SelectedRecords, Value} from './SelectedRecords';

export abstract class NgDropdownControlValueAccessor implements ControlValueAccessor {

  private touched = false;

  // tslint:disable-next-line:variable-name
  private _disabled = false;

  protected constructor(
    public readonly selectedRecords: SelectedRecords
  ) {
  }

  protected onChange = (v: Value) => {
  };

  private onTouched = () => {
  };

  protected updateValue(): void {
    this.onChange(this.selectedRecords.ngModel);
    this.markAsTouched();
  }

  protected markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public writeValue(v: Value): void {
    this.selectedRecords.set(v);
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

}
