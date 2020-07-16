import { Injectable } from '@angular/core';
import { DataModel } from './gen-random.model';
import { ConnectableObservable, Observable, Observer, PartialObserver, Subject } from 'rxjs';
import { publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {

  private dataObservable: ConnectableObservable<DataModel>;

  constructor() {
    this.dataObservable = new Observable(

      (observer: Observer<DataModel>) => {

        console.log('Observable Created');

        let  n = 0;

        const f = () => {
          n++;
          console.log(n);
          if (n <= 10) {
            const t = Math.round(Math.random() * 2000) + 1000;
            observer.next({timestamp: t, data: n});
            setTimeout(f, t);
          }else {
            observer.complete();
          }
        };

        f();

      }
    ).pipe(publish()) as ConnectableObservable<DataModel>;
  }

  connect(): void {
    this.dataObservable.connect();
  }

  subscribe(subject: Subject<DataModel>): void {
    this.dataObservable.subscribe(subject);
  }
}
