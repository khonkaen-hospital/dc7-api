import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbornComponent } from './newborn.component';

describe('NewbornComponent', () => {
  let component: NewbornComponent;
  let fixture: ComponentFixture<NewbornComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbornComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbornComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
