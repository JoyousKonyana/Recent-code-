import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankQuestionsComponent } from './manage-bank-questions.component';

describe('ManageBankQuestionsComponent', () => {
  let component: ManageBankQuestionsComponent;
  let fixture: ComponentFixture<ManageBankQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBankQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBankQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
