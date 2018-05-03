import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphselectiondialogComponent } from './graphselectiondialog.component';

describe('GraphselectiondialogComponent', () => {
  let component: GraphselectiondialogComponent;
  let fixture: ComponentFixture<GraphselectiondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphselectiondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphselectiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
