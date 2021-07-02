import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

interface ILink {
  url: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public readonly links: ILink[] = [
    {
      text: 'Simple',
      url: '/'
    },
    {
      text: 'Multi',
      url: '/multi'
    },
    {
      text: 'Templates',
      url: '/templating'
    },
    {
      text: 'Grouped',
      url: '/grouped'
    },
    {
      text: 'Filterable',
      url: '/filterable'
    },
    {
      text: 'Big data',
      url: '/big-data'
    },
    {
      text: 'Lazy load',
      url: '/lazy'
    }
  ];

  public readonly activeUrl$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(e => (e as NavigationEnd).url)
  );

  constructor(
    private router: Router
  ) {
  }

}
