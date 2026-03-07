import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule
  ]
})
export class LogInPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  goToRegister() {
  console.log('Dugme kliknuto, pokrećem navigaciju...');

  // 3. Ručno šaljemo korisnika na register
  this.router.navigateByUrl('/register').then(success => {
    if (success) {
      console.log('Uspelo! Stigli smo na Register.');
    } else {
      console.error('Navigacija je odbijena! Proveri AppRoutingModule ili Guars.');
    }
  }).catch(err => {
    console.error('DESIO SE ERROR:', err);
  });
}

  ngOnInit() {}

  onLogIn(logInForm: NgForm) {
    if (!logInForm.valid) {
      return; // Ako forma nije validna, prekidamo akciju odmah
    }

    this.isLoading = true;
    console.log(logInForm);
    
    
    this.authService.login(logInForm.value).subscribe({
      
      
      next: (resData: any) => {
        console.log('Prijava uspesna');
        console.log(resData);
        this.isLoading = false; 
        this.router.navigateByUrl('/workout-log');
      },
      
      
      error: (errRes: any) => {
        console.log('Error:', errRes);
        this.isLoading = false;

        // Pravimo alert koji iskače kad se unese pogrešna šifra/email
        this.alertCtrl.create({
          header: 'Authentication failed',
          message: 'Invalid email or password. Please try again.',
          buttons: ['Okay']
        }).then((alert) => {
          alert.present();
        });
      }
    }); 
  }
}