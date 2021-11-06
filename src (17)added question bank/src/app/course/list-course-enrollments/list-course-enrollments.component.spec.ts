import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseEnrollmentsComponent } from './list-course-enrollments.component';

describe('ListCourseEnrollmentsComponent', () => {
  let component: ListCourseEnrollmentsComponent;
  let fixture: ComponentFixture<ListCourseEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCourseEnrollmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
