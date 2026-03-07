import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../workout/workout.service';
import { Exercise } from '../workout/exercise.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; 

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.page.html',
  styleUrls: ['./workout-log.page.scss'],
  standalone: false,
})
export class WorkoutLogPage implements OnInit, OnDestroy {
  loadedExercises: Exercise[] = [];
  isLoading = false;

  
  constructor(
    private workoutService: WorkoutService, 
    private alertController: AlertController, 
    private router: Router,
    private authService: AuthService 
  ) {
    console.log('constructor');
  }

  onDelete(exerciseId: string, slidingItem: any) {
    slidingItem.close();
    this.workoutService.deleteExercise(exerciseId).subscribe({
      next: () => {
        
        this.loadedExercises = this.loadedExercises.filter(ex => ex.id !== exerciseId);
        console.log('Trening uspešno obrisan!');
      },
      error: (err) => {
        console.error('GREŠKA PRI BRISANJU:', err);
      }
    });
  }

  async onEdit(ex: Exercise, slidingItem: any) {
    slidingItem.close();

    const alert = await this.alertController.create({
      header: `Izmeni: ${ex.name}`,
      inputs: [
        { name: 'sets', type: 'number', value: ex.sets, placeholder: 'sets' },
        { name: 'reps', type: 'number', value: ex.reps, placeholder: 'reps' },
        { name: 'weight', type: 'number', value: ex.weight, placeholder: 'weight (kg)' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            
            this.workoutService.updateExercise(ex.id, ex.name, +data.sets, +data.reps, +data.weight).subscribe(() => {
              const index = this.loadedExercises.findIndex(e => e.id === ex.id);
              if (index > -1) {
                
                this.loadedExercises[index] = new Exercise(
                  ex.id,
                  ex.name,
                  +data.sets,
                  +data.reps,
                  +data.weight,
                  ex.date,
                  ex.userId
                );
              }
              console.log('Uspešna izmena!');
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

  onLogout() {
    this.authService.logOut(); 
    this.router.navigateByUrl('/log-in'); 
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.workoutService.fetchExercises().subscribe({
      next: (exercises: Exercise[]) => {
        this.loadedExercises = exercises;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  
  ionViewDidEnter() { console.log('ionViewDidEnter'); }
  ionViewWillLeave() { console.log('ionViewWillLeave'); }
  ionViewDidLeave() { console.log('ionViewDidLeave'); }
  ngOnDestroy() { console.log('ngOnDestroy'); }
}