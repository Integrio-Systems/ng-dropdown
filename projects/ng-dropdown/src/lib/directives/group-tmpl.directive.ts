import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[recordGroupTmpl]'
})
export class GroupTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
