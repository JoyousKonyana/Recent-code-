import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionAnswersComponent } from './list-question-answers.component';

describe('ListQuestionAnswersComponent', () => {
  let component: ListQuestionAnswersComponent;
  let fixture: ComponentFixture<ListQuestionAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
