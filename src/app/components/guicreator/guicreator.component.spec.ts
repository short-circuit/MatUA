import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuicreatorComponent } from './guicreator.component';

describe('GuicreatorComponent', () => {
  let component: GuicreatorComponent;
  let fixture: ComponentFixture<GuicreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuicreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuicreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
