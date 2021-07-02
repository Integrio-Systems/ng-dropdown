import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[labelTmpl]'
})
export class LabelTemplateDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
