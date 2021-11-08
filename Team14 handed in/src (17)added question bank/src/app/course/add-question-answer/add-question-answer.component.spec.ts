import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionAnswerComponent } from './add-question-answer.component';

describe('AddQuestionAnswerComponent', () => {
  let component: AddQuestionAnswerComponent;
  let fixture: ComponentFixture<AddQuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
