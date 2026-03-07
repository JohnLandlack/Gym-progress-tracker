import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup; //more uzvicnik jer mi ne da zbog validacije



  constructor(private authService: AuthService, private loadingCtrl: LoadingController,
    private router: Router, private navCtrl: NavController) { 

    }
  ngOnInit() {

    this.registerForm = new FormGroup({

      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])



    });
  } //VALIDACIJA



    onRegister() {

      this.loadingCtrl.create({message: "Registering..."}).then((loadingEl) =>{
        loadingEl.present();
        this.authService.register(this.registerForm.value).subscribe(resData => {
        console.log('Registracija uspela');
        console.log(resData);
        loadingEl.dismiss();
        this.router.navigateByUrl('/workout-log');
      });
      });
      

    }

    onBack() {
    this.navCtrl.back();
  }



}
