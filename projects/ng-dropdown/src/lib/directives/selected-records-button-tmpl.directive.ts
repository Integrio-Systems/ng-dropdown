import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[selectedRecordsButtonTmpl]'
})
export class SelectedRecordsButtonTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
