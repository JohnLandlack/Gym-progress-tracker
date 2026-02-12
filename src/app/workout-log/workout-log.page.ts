import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.page.html',
  styleUrls: ['./workout-log.page.scss'],
  standalone: false,
})
export class WorkoutLogPage implements OnInit, OnDestroy {

  constructor() {

    console.log('constructor');

   }

  ngOnInit() {

    console.log('ngOnInit');


  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }

  ngOnDestroy(){
    console.log('ngOnDestroy');
  }

}
