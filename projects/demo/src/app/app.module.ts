import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgDropdownModule} from '../../../ng-dropdown/src/lib/ng-dropdown.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SimpleComponent} from './pages/simple/simple.component';
import {MultiComponent} from './pages/multi/multi.component';
import {TemplatingComponent} from './pages/tempating/templating.component';
import {GroupedComponent} from './pages/grouped/grouped.component';
import {FilterableComponent} from './pages/filtarable/filterable.component';
import {BigDataComponent} from './pages/big-data/big-data.component';
import {LazyLoadComponent} from './pages/lazy-load/lazy-load.component';
import {CommonModule} from '@angular/common';
import {CompactModeSwitcherDirective} from './compact-mode-switcher.directive';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    MultiComponent,
    TemplatingComponent,
    GroupedComponent,
    FilterableComponent,
    BigDataComponent,
    LazyLoadComponent,
    CompactModeSwitcherDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgDropdownModule,
    FormsModule,
    NgDropdownModule,
    RouterModule.forRoot([
      {
        path: '',
        component: SimpleComponent
      },
      {
        path: 'multi',
        component: MultiComponent
      },
      {
        path: 'templating',
        component: TemplatingComponent
      },
      {
        path: 'grouped',
        component: GroupedComponent
      },
      {
        path: 'filterable',
        component: FilterableComponent
      },
      {
        path: 'big-data',
        component: BigDataComponent
      },
      {
        path: 'lazy',
        component: LazyLoadComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
