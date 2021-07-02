import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[spinnerTmpl]'
})
export class SpinnerTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
