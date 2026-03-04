import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  // Ova funkcija će primati podatke sa tvoje forme
  addExercise(name: string, sets: number, reps: number, weight: number) {
    
    // 1. Pakujemo podatke u jedan objekat (po onom tvom modelu)
    const newExercise: Exercise = {
      id: Math.random().toString(), // Privremeni ID, Firebase će nam dati pravi kasnije
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
      date: new Date(),
      userId: 'test-user-id' // Privremeni ID korisnika dok ne povežemo pravi login
    };

    return this.http.post<{ name: string}>(
      'https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/exercise.json',
      newExercise
    );
  }

  fetchExercises() {
  return this.http.get<{ [key: string]: any }>(  //odavde kupim informacije sa baze i prikazujem na ekranu
    'https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/exercise.json'
  ).pipe(
    map(resData => {
      const exercisesArray: any[] = [];
      // prolazimo kroz svaki onaj nasumicni kod u Firebase-u


      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          // pakujemo ga u nas niz i dodajemo taj kod kao 'id'
          exercisesArray.push({
            id: key, 
            name: resData[key].name,
            sets: resData[key].sets,
            reps: resData[key].reps,
            weight: resData[key].weight,
            date: resData[key].date,
            userId: resData[key].userId
          });
        }
      }
      return exercisesArray; // vracamo cist niz spreman za prikaz
    })
  );
}

deleteExercise(id: string) {
  
  return this.http.delete(
    `https://gym-progress-tracker-537cb-default-rtdb.europe-west1.firebasedatabase.app/exercise/${id}.json`
  );
}




}
