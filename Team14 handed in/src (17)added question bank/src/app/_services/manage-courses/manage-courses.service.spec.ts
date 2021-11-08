import { TestBed } from '@angular/core/testing';

import { ManageCoursesService } from './manage-courses.service';

describe('ManageCoursesService', () => {
  let service: ManageCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
