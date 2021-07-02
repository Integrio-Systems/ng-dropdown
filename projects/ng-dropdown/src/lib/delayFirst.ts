import {Observable, of} from 'rxjs';
import {delay, mergeMap} from 'rxjs/operators';

export const delayFirst = (time: number) => (o: Observable<any>) => o.pipe(
  mergeMap((r, i) => i === 0 ? of(r).pipe(delay(time)) : of(r)),
);
