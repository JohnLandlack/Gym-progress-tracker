import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
  standalone: false,
})
export class AddExercisePage implements OnInit, OnDestroy {

exercises = [
    { name: 'Bench Press', image: 'assets/exercise/bench.jpg', muscle: 'Chest' },
    { name: 'Squat', image: 'assets/exercise/squat.jpg', muscle: 'Legs' },
    { name: 'Deadlift', image: 'assets/exercise/deadlift.jpg', muscle: 'Back' },
    { name: 'Pull Ups', image: 'assets/exercise/pullups.jpg', muscle: 'Back' },
    { name: 'Shoulder Press', image: 'assets/exercise/shoulderpress.jpg', muscle: 'Shoulders' },
    { name: 'Dips', image: 'assets/exercise/dips.jpg', muscle: 'Triceps' }
  ]; // ovde zapravo dodajem vezbe a on mi kroz ngFor ucitava ove vezbe i prikazuje ih

  constructor(private alertCtrl: AlertController) {
    console.log('constructor');
  }

  async addWeight(exerciseName: string) {
    const alert = await this.alertCtrl.create({
      header: exerciseName,
      subHeader: 'Add weight for this exercise',
      inputs: [
        {
          name: 'weight',
          type: 'number',
          placeholder: 'kg'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            console.log('Added:', exerciseName, 'Weight:', data.weight, 'kg');
            // Kasnije ovde ide logika za Firebase
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
