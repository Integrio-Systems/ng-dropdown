import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[selectedRecordTmpl]'
})
export class SelectedRecordTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
