import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Observer, fromEvent } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements OnInit, AfterViewInit {

  @ViewChild('myButton') button: ElementRef;

  n1 = 0;
  n2 = 0;
  s1 = '';
  s2 = '';

  constructor() { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    console.log(this.button);
    const myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click');

    myBtnClickObservable.subscribe( (event) => console.log('button click 1'));
    myBtnClickObservable.subscribe( (event) => console.log('button click 2'));

    class Producer {
      private myListeners = [];
      private n = 0;
      private id: number;

      addListener(listener): void {
        console.log('TOTAL LISTENERS ', this.myListeners.length + 1);
        this.myListeners.push(listener);
      }

      start(): void{
        this.id = setInterval(() => {
          ++this.n;
          console.log('From Producer: ', this.n);
          for (const lst of this.myListeners) {
            lst(this.n);
          }
        }, 5000);
      }

      stop(): void{
        clearInterval(this.id);
      }
    }

    // tslint:disable-next-line: member-ordering
    const producer: Producer = new Producer();

    producer.start();

    setTimeout(() => {
      producer.addListener((n) => console.log('From listener1: ', n));
      producer.addListener((n) => console.log('From listener2: ', n));
    }, 20000);

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener( (n: number) => observer.next(n));
      }
    );

    myHotObservable.subscribe((n) => console.log('From subscriber 1: ', n));
    myHotObservable.subscribe((n) => console.log('From subscriber 2: ', n));

  }

}




