import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[noAvailableRecordsTmpl]'
})
export class NoAvailableRecordsTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
