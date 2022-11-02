# *Flexible multiselect for angular 8+*

# How to get started
1. Create file (if not exist) **.npmrc** in the root of your project with following line `registry=https://npm.pkg.github.com/Integrio-Systems`
2. run `npm install -S @Integrio-Systems/ng-dropdown`
3. run `npm install -S @angular/cdk`   
3. add following styles
  - `@import "~@angular/cdk/overlay-prebuilt.css";`
  - `@import "~@integriosystems/ng-dropdown/assets/default.theme";`
  - `@import "~@integriosystems/ng-dropdown/assets/icons/ng-dropdown-icons.css";`
## @Input

| Parameter name                    | Type                                            | Default    | Description                                                   |
|-----------------------------------|-------------------------------------------------|------------|---------------------------------------------------------------|
| multi                             | boolean                                         | false      | multi/single select mode                                      |
| bindLabel                         | string                                          | undefined  | property to use for label                                     |
| bindValue                         | string &vert; (record: any) => any              | undefined  | property to use for value                                     |
| recordComparer                    | (ngModel: any, record:any) => boolean           | undefined  | relationship between ngModel and list record                  |
| closeAfterSelect                  | boolean                                         | true       | close available records panel after select                    |
| records                           | any[]                                           | []         | records                                                       |
| clearable                         | boolean                                         | true       | show/hide clear button                                        |
| placeholder                       | string                                          | undefined  | placeholder                                                   |
| loading                           | boolean                                         | undefined  | show/hide spinner                                             |
| groupBy                           | string &vert; string[]                          | undefined | group by property name                                        |
| showSelected                      | boolean                                         | true       | show/hide selected records button                             |
| defaultClearButtonTitle           | string                                          | ''         | default clear button title                                    |
| defaultSelectedRecordsButtonTitle | string                                          | ''         | default selected record button title                          |
| compact                           | boolean                                         | false      | show combined or single panel                                 |
| panelCssClass                     | string                                          | undefined  | panel custom css class                                        |
| openManually                      | boolean                                         | undefined  | if true then panel will not open when user clicks the element |
| recordTrackerProperty             | string &vert; (record)=> (string &vert; number) | undefined  | property that uniquely identify record                        |


## @Output
| Parameter name              | Type | Emit when                                               |
|-----------------------------|------|---------------------------------------------------------|
| availableRecordsPanelOpen   | void | available records panel open                            |
| availableRecordsPanelClose  | void | available records panel close                           |
| selectedRecordsPanelOpen    | void | selected records panel open                             |
| selectedRecordsPanelClose   | void | selected records panel close                            |
| combinedPanelOpen           | void | combined panel open                                     |
| combinedPanelClose          | void | combined panel close                                    |
| manualOpen                  | void | openManually is set to true and user clicks the element |

## Templates
| Selector                   | Description                                                                        | Context                                                                                                                                                                                                                   |
|----------------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| availableRecordTmpl        | How record is showed in available records panel                                    | record - array element <br> total - total number of records (number) <br> selected - is record selected (boolean) <br> selectAction - call this action when record clicked (function) <br> level - nesting level (number) |
| selectedRecordTmpl         | How record is showed in selected records panel                                     | same as for availableRecordTmpl                                                                                                                                                                                           |
| labelTmpl                  | What is showed in input itself                                                     | $implicit - selected records (any[])                                                                                                                                                                                      |
| availableRecordsHeaderTmpl | Header for available records panel                                                 | -                                                                                                                                                                                                                         |
| availableRecordsFooterTmpl | Footer for available records panel                                                 | -                                                                                                                                                                                                                         |
| selectedRecordsHeaderTmpl  | Header for selected records panel                                                  | -                                                                                                                                                                                                                         |
| selectedRecordsFooterTmpl  | Footer for selected records panel                                                  | -                                                                                                                                                                                                                         |
| noRecordsTmpl              | What to show if there are no records for both available and selected records panel | -                                                                                                                                                                                                                         |
| groupTmpl                  | What to show as group if groupBy property is set                                   | record - array element <br> group - group by property value <br> level - nesting level (number)                                                                                                                           |
| clearButtonTmpl            | Custom clear button                                                                | $implicit - clear action (function)                                                                                                                                                                                       |
| spinnerTmpl                | Custom spinner                                                                     | -                                                                                                                                                                                                                         |
| selectedRecordsButtonTmpl  | Custom selected records button                                                     | $implicit - show panel action (function)                                                                                                                                                                                  |

## <p style="text-align: center;">Directives</p>  

> **availableRecordsFilter** (filter available records)

### Parameters

| Parameter name             | Parameter direction | Type                                                          | Description                                |
|----------------------------|---------------------|---------------------------------------------------------------|--------------------------------------------|
| filterAvailableBy          |@Input()             | string  &vert; (record:  any,  pattern:  string ) =>  boolean | filter by property name or filter function |
| availableRecordsSearchTerm |@Input()             | string                                                        | search pattern                             |



> **selectedRecordsFilter** (filter selected records)

### Parameters

| Parameter name            | Parameter direction | Type                                                           | Description                                |
|---------------------------|---------------------|----------------------------------------------------------------|--------------------------------------------|
| filterSelectedBy          |@Input()             | string  &vert; (record:  any,  pattern:  string ) =>  boolean  | filter by property name or filter function |
| selectedRecordsSearchTerm |@Input()             | string                                                         | search pattern                             |


> **availableRecordsPanelScrollMonitor** (controlling / monitoring available records panel scroll)  
> exportedAs availableRecordsPanelScroll

### Parameters

| Parameter name                  | Parameter direction | Type                        | Description                          |
|---------------------------------|---------------------|-----------------------------|--------------------------------------|
| availableRecordsPanelScrolled   | @Output()           | {top:number;bottom:number;} | Fired when records panel scrolled    |


> **selectedRecordsPanelScrollMonitor** (controlling / monitoring selected records panel scroll)  
> exportedAs selectedRecordsPanelScroll

### Parameters

| Parameter name                         | Parameter direction | Type                        | Description                          |
|----------------------------------------|---------------------|-----------------------------|--------------------------------------|
| selectedRecordsPanelScrolled           | @Output()           | {top:number;bottom:number;} | Fired when records panel scrolled           |

## <p style="text-align: center;">Injectables</p> 

> **NgDropdownInternals** (configuring internals)  

| Member name                     | Type                                         | Default                        | Description                                                                                            |
|---------------------------------|----------------------------------------------|--------------------------------|--------------------------------------------------------------------------------------------------------|
| listHeight (px)                 | number                                       | 250                            | List height                                                                                            |
| combinedPanelWidthLimit (px)    | number                                       | 600                            | Width at which combined panel use ng-dropdown element width                                            |
| calculateCombinedPanelWidth     | (element: ElementRef<HTMLElement>) => number | undefined                      | Provide your own combined panel width calculation logic (take priority over combinedPanelWidthLimit)   |
| calculateSinglePanelWidth       | (element: ElementRef<HTMLElement>) => number | undefined                      | Provide your own single panel width calculation logic                                                  |
| originPoint                     | (element: HTMLElement) => DOMRect            | undefined                      | Origin relative to which to position the panel                                                         |
| cdkVirtualForTemplateCacheSize  | number                                       | 20                             | **[cdkVirtualForTemplateCacheSize](https://v8.material.angular.io/cdk/scrolling/api#CdkVirtualForOf)** |
| combinedPanelShowDelay (ms)     | number                                       | 50                             | combined panel show delay                                                                              |

> **ScrollStrategyFactory**   

| Type                      | Default                                                                                                          | Description               |
|---------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------|
| ()=>VirtualScrollStrategy | **[FixedSizeVirtualScrollStrategy](https://v8.material.angular.io/cdk/scrolling/api#CdkFixedSizeVirtualScroll)** | custom scroll strategy    |

