export interface Exercise {
  id: string;
  name: string;      // npr. Mrtvo dizanje
  sets: number;      // Broj serija
  reps: number;      // Broj ponavljanja
  weight: number;    // Kilaza
  date: Date;        // Da znam kad sam odradio trening
  userId: string;    // Povezujemo vezbu sa ulogovanim korisnikom
}