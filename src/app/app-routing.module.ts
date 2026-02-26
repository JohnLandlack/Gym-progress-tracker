import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  {
    path: 'workout-log',
    loadChildren: () => import('./workout-log/workout-log.module').then( m => m.WorkoutLogPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'workout-log',
    pathMatch: 'full'
  },
  {
    path: 'add-exercise',
    loadChildren: () => import('./add-exercise/add-exercise.module').then( m => m.AddExercisePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
