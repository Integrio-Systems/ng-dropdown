import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[availableRecordTmpl]'
})
export class AvailableRecordTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
