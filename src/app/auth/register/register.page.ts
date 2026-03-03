import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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



  constructor() { }
  ngOnInit() {

    this.registerForm = new FormGroup({

      name: new FormControl('Jovan', Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])



    });
  } //VALIDACIJA



    onRegister() {

      console.log(this.registerForm);


    }

   


   
}
