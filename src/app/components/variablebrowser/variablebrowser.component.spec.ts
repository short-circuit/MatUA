import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablebrowserComponent } from './variablebrowser.component';

describe('VariablebrowserComponent', () => {
  let component: VariablebrowserComponent;
  let fixture: ComponentFixture<VariablebrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablebrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablebrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
