import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[selectedRecordsHeaderTmpl]'
})
export class SelectedRecordsHeaderTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
