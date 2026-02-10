import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExercisePage } from './add-exercise.page';

describe('AddExercisePage', () => {
  let component: AddExercisePage;
  let fixture: ComponentFixture<AddExercisePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
