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
  constructor(private authService : AuthService, private router : Router,
    private alertCtrl: AlertController) {

     }

  ngOnInit() {
  }

  onLogIn(logInForm: NgForm){
    console.log(logInForm);
    if(logInForm.valid){
      this.authService.logIn(logInForm.value).subscribe(resData =>{
        console.log('prijava uspesna');
        console.log(resData);
        this.router.navigateByUrl('/workout-log');
      },
      errRes =>{
        console.log(errRes);
        this.isLoading=false;
        let message ="Incorrect email or password";

        

        this.alertCtrl.create({
          header: 'Authentication failed',
          message,
          buttons:['Okay']
        }).then((alert) =>{
          alert.present();
        });

      });
    }
    
  }

}

