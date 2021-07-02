import {Component} from '@angular/core';
import {IScrollInfo} from '../../../../../ng-dropdown/src/lib/IScrollInfo';
import {merge, Observable, of, Subject} from 'rxjs';
import {delay, exhaustMap, mapTo, share, skip, startWith, tap} from 'rxjs/operators';

@Component({
  templateUrl: './lazy-load.component.html',
  styleUrls: ['./lazy-load.component.scss']
})
export class LazyLoadComponent {

  private currentPage = 0;
  private readonly totalPages = 5;
  private readonly loadMoreTrigger = new Subject<number>();

  public readonly data!: Observable<number[]>;
  public readonly loading?: Observable<boolean>;

  constructor() {
    this.data = this.loadMoreTrigger.pipe(
      startWith(0),
      exhaustMap(page => LazyLoadComponent.loadMore(page)),
      tap(() => this.currentPage++),
      share()
    );
    this.loading = merge(
      this.loadMoreTrigger.pipe(
        skip(1),
        mapTo(true)
      ),
      this.data.pipe(mapTo(false))
    );
  }

  private static generateRecords(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i + 1);
  }

  private static loadMore(page: number): Observable<number[]> {
    return of(LazyLoadComponent.generateRecords((page + 1) * 100)).pipe(
      delay(page === 0 ? 0 : 3000)
    );
  }

  public scrolled(e: IScrollInfo): void {
    if (e.bottom <= 5 && this.currentPage <= this.totalPages - 1) {
      this.loadMoreTrigger.next(this.currentPage);
    }
  }

}
