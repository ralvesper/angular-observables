import { DataModel } from './../../gen-random-data/gen-random.model';
import { Component, OnInit, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  logs: string[] = [];
  connected = false;

  private subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  private logData(data: DataModel): void {
    this.logs.push('Timestamp: ' + data.timestamp + 'Data: ' +  data.data);
  }

  connect(): void{
    console.log('Connected!');
    this.connected = true;
    this.subscription = this.subject.subscribe(
      (data: DataModel) => {
         this.logData(data);
      },
      (error)  => {
        console.error(error);
        this.logs.push('Error!');
        this.connected = false;
      },
      () =>  {
        this.connected = false;
        this.logs.push('Finished!');
      }
    );
  }

  disconnect(): void{
    console.log('Disconnected!');
    this.connected = false;
    this.subscription.unsubscribe();
  }


}
