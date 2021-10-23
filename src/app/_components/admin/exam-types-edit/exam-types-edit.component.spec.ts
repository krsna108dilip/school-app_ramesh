/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExamTypesEditComponent } from './exam-types-edit.component';

describe('ExamTypesEditComponent', () => {
  let component: ExamTypesEditComponent;
  let fixture: ComponentFixture<ExamTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTypesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
