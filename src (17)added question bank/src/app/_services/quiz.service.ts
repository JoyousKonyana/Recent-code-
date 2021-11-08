import { submitQuiz } from './../_models/submitQuiz';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

import {Question, Quiz} from '../_models';
import { QuestionBank } from '../_models/QuestionBank';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  httHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { } 
  movies:any = localStorage.getItem("user");
  moviesi:any     = JSON.parse(this.movies);
  userId = this.moviesi['id'];

  //Quiz
  urlQuiz = 'https://localhost:44319/api/Quiz';
  createQuiz(quiz:any) {
    return this.http.post(`${this.urlQuiz}/CreateQuiz/`+ this.userId, quiz, {headers:this.httHeaders});
  }
  getQuizByLessonOutcomeID(id: number): Observable<any> {  
    return this.http.get<any>(`${this.urlQuiz + '/GetQuizByLessonOutcomeID/' + id}`);  
  }
  updateQuiz(id: number, quiz: any) {
    return this.http.put(`${this.urlQuiz + '/UpdateQuiz/' + id + '/' + this.userId}`, quiz);
  }

  //Question
  urlQuestion = 'https://localhost:44319/api/Question';
  createQuestion(question:any) {
    return this.http.post(`${this.urlQuestion}/Createquestion/` +this.userId, question, {headers:this.httHeaders});
  }
  getQuestionByQuizID(id: number): Observable<any> {  
    return this.http.get<any>(`${this.urlQuestion + '/GetQuestionsForQuiz/' + id}`);  
  }
  updateQuestion(id: number, question: any) {
    return this.http.put(`${this.urlQuestion + '/UpdateQuestion/' + id + '/' + this.userId}`, question);
  }
  deleteQuestion(id: number) {
    return this.http.delete(`${this.urlQuestion + '/DeleteQuestion/' + id + '/' + this.userId}`);
  }
  getAllQuestion(): Observable<any[]> {  
    return this.http.get<any[]>(`${this.urlQuestion}/GetAllQuestions/1`);  
  }

  //Submit Quiz
  submitQuiz(courseId: number, onboarderId: number, quizId: number, submitQuiz:submitQuiz[]) {
    return this.http.post(`${this.urlQuiz + '/SubmitQuiz/' + courseId + '/' + onboarderId + '/' + quizId}`, submitQuiz);
  }

  //Option
  urlOption = 'https://localhost:44319/api/Option';
  createOption(option:any) {
    return this.http.post(`${this.urlOption}/CreateOption/` + this.userId, option, {headers:this.httHeaders});
  }
  getOptionById(id: number): Observable<any> {  
    return this.http.get<any>(`${this.urlOption + '/GetOptionByQuestionId/' + id }`);  
  }
  updateOption(id: number, option: any) {
    return this.http.put(`${this.urlOption + '/UpdateOption/' + id + '/' + this.userId}`, option);
  }
  deleteOption(id: number) {
    return this.http.delete(`${this.urlOption + '/DeleteOption/' + id + '/' + this.userId}`);
  }

  //create questionbank
  urlQuestionBank = 'https://localhost:44319/api/QuestionBank';
  createQuestionBank(questionbank:QuestionBank){
    return this.http.post(`${this.urlQuestionBank}/CreateQuestionBank/` + 1, questionbank, {headers:this.httHeaders});
  }

  getAllQuestionBanks(){
    return this.http.get<any[]>(`${this.urlQuestionBank}/GetAllQuestionBanks`);
  }

} 