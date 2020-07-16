import { Component, OnInit } from '@angular/core';
import { Subject, AsyncSubject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { GenRandomDataService } from '../gen-random-data/gen-random-data.service';
import { DataModel } from '../gen-random-data/gen-random.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subject: Subject<DataModel>;
  replaySubject: ReplaySubject<DataModel>;
  asyncSubject: AsyncSubject<DataModel>;
  behaviorSubject: BehaviorSubject<DataModel>;

  constructor(private dataService: GenRandomDataService) { }

  ngOnInit(): void {

    this.subject = new Subject<DataModel>();
    this.replaySubject = new ReplaySubject<DataModel>();
    this.asyncSubject = new AsyncSubject<DataModel>();
    this.behaviorSubject = new BehaviorSubject<DataModel>({ timestamp: 0, data: 0 });

    this.dataService.subscribe(this.subject);
    this.dataService.subscribe(this.replaySubject);
    this.dataService.subscribe(this.asyncSubject);
    this.dataService.subscribe(this.behaviorSubject);

    // const s: Subject<number> =  new Subject();

    // s.subscribe(
    //    n => {
    //     return console.log(n);
    //   }
    // );

    // s.next(1);
    // s.next(2);
    // s.next(3);
    // s.next(4);
    // s.complete();

  }

  connect(): void {
    this.dataService.connect();
  }

}
