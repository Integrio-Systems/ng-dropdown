import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[noSelectedRecordsTmpl]'
})
export class NoSelectedRecordsTmplDirective {

  constructor(
    public template: TemplateRef<any>
  ) {
  }

}
