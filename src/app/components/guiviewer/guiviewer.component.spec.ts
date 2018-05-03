import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiviewerComponent } from './guiviewer.component';

describe('GuiviewerComponent', () => {
  let component: GuiviewerComponent;
  let fixture: ComponentFixture<GuiviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
