# *Flexible multiselect for angular 8+*

### **[DEMO](https://integriosystems.github.io/ng-dropdown/)**

# How to get started
1. Create file (if not exist) **.npmrc** in the root of your project with following line `registry=https://npm.pkg.github.com/integriosystems`
2. run `npm install -S @integriosystems/ng-dropdown`
3. run `npm install -S @angular/cdk`   
3. add following styles
  - `@import "~@angular/cdk/overlay-prebuilt.css";`
  - `@import "~@integriosystems/ng-dropdown/assets/default.theme";`
  - `@import "~@integriosystems/ng-dropdown/assets/icons/ng-dropdown-icons.css";`
# @Input parameters

| Parameter name                    | Type    | Default   | Description                          |
|-----------------------------------|---------|-----------|--------------------------------------|
| multi                             | boolean | false     | multi/single select mode             |
| bindLabel                         | string  | undefined | property to use for label             |
| bindValue                         | string or (record: any) => any|  undefined        |    property to use for value|
| recordComparer                    |  (a: any, b:any) => boolean | undefined | how to compare records |
| closeAfterSelect                  | boolean | true      | close available records panel after select             |
| records                           | any[]   | []        | records                              |
| clearable                         | boolean | true      | show/hide clear button               |
| placeholder                       | string  | undefined | placeholder                          |
| loading                           | boolean | undefined | show/hide spinner                    |
| groupBy                           | string  | undefined | group by property name               |
| showSelected                      | boolean | true      | show/hide selected records button    |
| defaultClearButtonTitle           | string  | ''        | default clear button title           |
| defaultSelectedRecordsButtonTitle | string  | ''        | default selected record button title |
| compact                           | boolean | false     | show both or single panel            |

# Templates
| Selector                   | Description                                                                        | Context                                                                                                                                          |
|----------------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| availableRecordTmpl        | How record showed in available records panel                                       | record - array element <br> total - total number of records (number) <br> selected - is record selected (boolean) <br> selectAction - call this action when record clicked (function) |
| selectedRecordTmpl         | How record showed in selected records panel                                        | same as for availableRecordTmpl                                                                                                                  |
| labelTmpl                  | What showed in input itself                                                        | $implicit - selected records (any[])                                                                                                             |
| availableRecordsHeaderTmpl | Header for available records panel                                                 | -                                                                                                                                                |
| availableRecordsFooterTmpl | Footer for available records panel                                                 | -                                                                                                                                                |
| selectedRecordsHeaderTmpl  | Header for selected records panel                                                  | -                                                                                                                                                |
| selectedRecordsFooterTmpl  | Footer for selected records panel                                                  | -                                                                                                                                                |
| noRecordsTmpl              | What to show if there are no records for both available and selected records panel | -                                                                                                                                                |
| groupTmpl                  | What to show as group if groupBy property is set                                   | record - array element <br> group - group by property value                                                                                                      |
| clearButtonTmpl            | Custom clear button                                                                | $implicit - clear action (function)                                                                                                              |
| spinnerTmpl                | Custom spinner                                                                     | -                                                                                                                                                |
| selectedRecordsButtonTmpl  | Custom selected records button                                                     | $implicit - show panel action (function)                                                                                                                    |

# Directives

> **availableRecordsFilter** (filter available records)

### Parameters

| Parameter name            | Parameter direction | Type                                                        | Description                                |
|---------------------------|---------------------|-------------------------------------------------------------|--------------------------------------------|
| filterAvailableBy          |@Input()             | string  or (record:  any,  pattern:  string ) =>  boolean   | filter by property name or filter function |
| availableRecordsSearchTerm |@Input()             | string                                                      | search pattern                             |

***

> **selectedRecordsFilter** (filter selected records)

### Parameters

| Parameter name            | Parameter direction | Type                                                        | Description                                |
|---------------------------|---------------------|-------------------------------------------------------------|--------------------------------------------|
| filterSelectedBy          |@Input()             | string  or (record:  any,  pattern:  string ) =>  boolean   | filter by property name or filter function |
| selectedRecordsSearchTerm |@Input()             | string                                                      | search pattern                             |

***

> **availableRecordsPanelMonitor** (controlling / monitoring available records panel)

### Parameters

| Parameter name                        | Parameter direction | Type                                      | Description                          |
|---------------------------------------|---------------------|-------------------------------------------|--------------------------------------|
| availableRecordsPanelVisibilityChange | @Output()           | boolean                     | Fired on panel show/hide             |
| availableRecordsPanelScrolled         | @Output()           | {top:number;bottom:number;} | Fired when records panel scrolled    |
| availableRecordsPanelScrollTopSignal  | @Input()            | Observable<number\>                        | Controlling records panel scroll top |
| availableRecordsPanelHideSignal       | @Input()            | Observable<any\>                           | Hide records panel                   |

***

> **selectedRecordsPanelMonitor** (controlling / monitoring selected records panel)

### Parameters

| Parameter name                       | Parameter direction | Type                                      | Description                          |
|--------------------------------------|---------------------|-------------------------------------------|--------------------------------------|
| selectedRecordsPanelVisibilityChange | @Output()           | boolean                     | Fired on panel show/hide             |
| selectedRecordsPanelScrolled         | @Output()           | {top:number;bottom:number;} | Fired when records panel scrolled    |
| selectedRecordsPanelScrollTopSignal  | @Input()            | Observable<number\>                        | Controlling records panel scroll top |
| selectedRecordsPanelHideSignal       | @Input()            | Observable<any\>                           | Hide records panel                   |
