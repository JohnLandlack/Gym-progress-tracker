import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../workout/workout.service';
import { Exercise } from '../workout/exercise.model';



@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.page.html',
  styleUrls: ['./workout-log.page.scss'],
  standalone: false,
})
export class WorkoutLogPage implements OnInit, OnDestroy {

  loadedExercises: Exercise[] = [];
  isLoading = false;

  constructor(private workoutService: WorkoutService) {
    console.log('constructor');
   }

   onDelete(exerciseId: string, slidingItem: any) {

  slidingItem.close();

  this.workoutService.deleteExercise(exerciseId).subscribe(() => {
    
    this.loadedExercises = this.loadedExercises.filter(ex => ex.id !== exerciseId);
    
    console.log('Trening uspešno obrisan!');
  });
}



  ngOnInit() {

    console.log('ngOnInit');


  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.workoutService.fetchExercises().subscribe(exercises => {

      this.loadedExercises = exercises;
      this.isLoading = false;
      console.log('Ucitane vezbe:', this.loadedExercises); //gledamo u konzoli sta je stiglo
    });

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
