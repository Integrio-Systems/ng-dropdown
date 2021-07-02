import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[availableRecordsHeaderTmpl]'
})
export class AvailableRecordsHeaderTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
