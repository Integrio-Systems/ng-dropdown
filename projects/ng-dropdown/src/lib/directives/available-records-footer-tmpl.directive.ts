import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[availableRecordsFooterTmpl]'
})
export class AvailableRecordsFooterTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
