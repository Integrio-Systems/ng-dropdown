import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[clearButtonTmpl]'
})
export class ClearButtonTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
