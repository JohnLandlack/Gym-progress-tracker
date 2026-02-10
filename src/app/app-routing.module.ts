import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'workout-log',
    loadChildren: () => import('./workout-log/workout-log.module').then( m => m.WorkoutLogPageModule)
  },
  {
    path: '',
    redirectTo: 'workout-log',
    pathMatch: 'full'
  },
  {
    path: 'add-exercise',
    loadChildren: () => import('./add-exercise/add-exercise.module').then( m => m.AddExercisePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
