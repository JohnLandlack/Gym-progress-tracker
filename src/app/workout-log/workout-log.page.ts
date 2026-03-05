import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../workout/workout.service';
import { Exercise } from '../workout/exercise.model';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.page.html',
  styleUrls: ['./workout-log.page.scss'],
  standalone: false,
})
export class WorkoutLogPage implements OnInit, OnDestroy {

  loadedExercises: Exercise[] = [];
  isLoading = false;

  constructor(private workoutService: WorkoutService, private alertController: AlertController) {
    console.log('constructor');
   }

   onDelete(exerciseId: string, slidingItem: any) {

  slidingItem.close();

  this.workoutService.deleteExercise(exerciseId).subscribe(() => {
    
    this.loadedExercises = this.loadedExercises.filter(ex => ex.id !== exerciseId);
    
    console.log('Trening uspešno obrisan!');
  });
}

async onEdit(ex: Exercise, slidingItem: any) {
  
  slidingItem.close();

  
  const alert = await this.alertController.create({
    header: `Izmeni: ${ex.name}`, // Ime vežbe ide u naslov! Nema kucanja.
    inputs: [
      {
        name: 'sets',
        type: 'number',
        value: ex.sets, 
        placeholder: 'sets'
      },
      {
        name: 'reps',
        type: 'number',
        value: ex.reps, 
        placeholder: 'reps'
      },
      {
        name: 'weight',
        type: 'number',
        value: ex.weight, 
        placeholder: 'weight (kg)'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Save',
        handler: (data) => {
          
          this.workoutService.updateExercise(ex.id, ex.name, +data.sets, +data.reps, +data.weight).subscribe(() => {
            
            // azuriranje niza vidljiv na ekranu
            const index = this.loadedExercises.findIndex(e => e.id === ex.id);
            if (index > -1) {
              this.loadedExercises[index] = {
                ...this.loadedExercises[index],
                sets: data.sets,
                reps: data.reps,
                weight: data.weight
              };
            }
            console.log('Uspesna izmena!');
          });
        }
      }
    ]
  });

  await alert.present();
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
