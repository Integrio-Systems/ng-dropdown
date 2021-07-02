import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[selectedRecordsFooterTmpl]'
})
export class SelectedRecordsFooterTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
