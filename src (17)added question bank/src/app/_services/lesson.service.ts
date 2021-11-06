import { LessonDTO } from './../_models/LessonDTO';
import { Lesson } from './../_models/lesson';
import { Lesson_Content } from '../_models';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LessonService {
  url = 'https://localhost:44319/api/Lesson';
  userId: any = localStorage.getItem('user');

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.url}/GetAllLessons`);
  }

  getAllLessons2(): Observable<LessonDTO[]> {
    return this.http.get<LessonDTO[]>(`${this.url}/GetAllLessons`);
  }

  getLessonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/GetLessonByCourseId/` + id);
  }

  getLesson_ContentByLessonoutcomeId(id: string): Observable<Lesson_Content> {
    return this.http.get<Lesson_Content>(`${this.url}/GetLessonContentByLessonOutcome/` + id);
  }

  getLessonByCourseId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/GetLessonByCourseId/` + id);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/DeleteLesson/` + id + '/' + this.userId);
  }

  update(id: number, lesson: object) {
    return this.http.put(`${this.url}/UpdateLesson/` + id + '/' + this.userId, lesson);
  }

  create(lesson: object) {
    return this.http.post(`${this.url}/CreateLesson/` + this.userId, lesson);
  }
}
