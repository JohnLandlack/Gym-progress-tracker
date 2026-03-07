import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from './exercise.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private _exercises = new BehaviorSubject<Exercise[]>([]);

  get exercises() {
    return this._exercises.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchExercises() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            return this.http.get<{ [key: string]: any }>(
              `https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/exercises.json?auth=${token}`
            );
          }),
          map(resData => {
            const exercises: Exercise[] = [];
            for (const key in resData) {
              if (resData.hasOwnProperty(key)) {
                exercises.push(
                  new Exercise(
                    key, 
                    resData[key].name, 
                    +resData[key].sets, 
                    +resData[key].reps, 
                    +resData[key].weight, 
                    new Date(resData[key].date), 
                    resData[key].userId
                  )
                );
              }
            }
            return exercises;
          }),
          tap(exercises => {
            this._exercises.next(exercises);
          })
        );
      })
    );
  }

  addExercise(name: string, sets: number, reps: number, weight: number) {
    let generatedId: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            if (!userId) throw new Error('Korisnik nije pronađen!');
            
            generatedId = new Date().getTime().toString();
            const newExercise = new Exercise(
              generatedId,
              name,
              sets,
              reps,
              weight,
              new Date(),
              userId
            );

            return this.http.put(
              `https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/exercises/${generatedId}.json?auth=${token}`,
              newExercise
            );
          }),
          switchMap(() => this.exercises),
          take(1),
          tap(exercises => {
            const newEx = new Exercise(generatedId, name, sets, reps, weight, new Date(), '');
            this._exercises.next(exercises.concat(newEx));
          })
        );
      })
    );
  }

  deleteExercise(exerciseId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            return this.http.delete(
              `https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/exercises/${exerciseId}.json?auth=${token}`
            );
          }),
          switchMap(() => this.exercises),
          take(1),
          tap(exercises => {
            this._exercises.next(exercises.filter(ex => ex.id !== exerciseId));
          })
        );
      })
    );
  }

  updateExercise(id: string, name: string, sets: number, reps: number, weight: number) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            const updatedExercise = {
              name: name,
              sets: sets,
              reps: reps,
              weight: weight,
              userId: userId,
              date: new Date()
            };
            return this.http.put(
              `https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/exercises/${id}.json?auth=${token}`,
              updatedExercise
            );
          }),
          switchMap(() => this.exercises),
          take(1),
          tap(exercises => {
            const updatedIndex = exercises.findIndex(ex => ex.id === id);
            const updatedArray = [...exercises];
            updatedArray[updatedIndex] = new Exercise(id, name, sets, reps, weight, new Date(), '');
            this._exercises.next(updatedArray);
          })
        );
      })
    );
  }
}