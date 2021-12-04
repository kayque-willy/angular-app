import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormPageComponent } from './task-form-page.component';

describe('TaskFormPageComponent', () => {
  let component: TaskFormPageComponent;
  let fixture: ComponentFixture<TaskFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
