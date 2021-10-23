/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StandardsEditComponent } from './standards-edit.component';

describe('StandardsEditComponent', () => {
  let component: StandardsEditComponent;
  let fixture: ComponentFixture<StandardsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
