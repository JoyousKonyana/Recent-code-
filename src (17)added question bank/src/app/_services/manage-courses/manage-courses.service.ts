import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageCoursesService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getAllQuestionBanksByLessonOutcomeId(lessonOutcomeId: number) {
    return this._httpClient.get(this.endpointBase.concat("QuestionBanks/GetAll/LessonOutcome/" + lessonOutcomeId),
      { reportProgress: true, observe: 'events' });
  }

  getQuestionBanksWithQuestionsByLessonOutcomeId(lessonOutcomeId: number) {
    return this._httpClient.get(this.endpointBase.concat("QuestionBanks/GetAll/WithQuestions/LessonOutcome/" + lessonOutcomeId),
      { reportProgress: true, observe: 'events' });
  }


  getAllQuestionBanks() {
    return this._httpClient.get(this.endpointBase.concat("QuestionBanks/GetAll"),
      { reportProgress: true, observe: 'events' });
  }
  getQuestionBank(questionBankId: number) {
    return this._httpClient.get(this.endpointBase.concat("QuestionBanks/Get/" + questionBankId),
      { reportProgress: true, observe: 'events' });
  }
  addQuestionBank(payload) {
    return this._httpClient.post(this.endpointBase.concat("QuestionBanks/Add"),
      payload,
      { reportProgress: true, observe: 'events' });
  }

  addQuestionAnswerOptions(payload) {
    return this._httpClient.post(this.endpointBase.concat("QuestionBanks/Question/AnswerOptions/Add"),
      payload,
      { reportProgress: true, observe: 'events' });
  }
  getQuestionAnswerOptions(quesitonId: number) {
    return this._httpClient.get(this.endpointBase.concat("QuestionBanks/Question/AnswerOptions/GetAll/" + quesitonId),
      { reportProgress: true, observe: 'events' });
  }

  getQuzzesByLessonOutcomeId(lessonOutcomeId: number) {
    return this._httpClient.get(this.endpointBase.concat("Quiz/GetAll/LessonOutcome/" + lessonOutcomeId),
      { reportProgress: true, observe: 'events' });
  }
  addQuiz(payload) {
    return this._httpClient.post(this.endpointBase.concat("Quiz/Add"),
      payload,
      { reportProgress: true, observe: 'events' });
  }

  getQuizDetails(quizId: number) {
    return this._httpClient.get(this.endpointBase.concat("Quiz/Get/" + quizId),
      { reportProgress: true, observe: 'events' });
  }

  addOnborderEnrollment(payload) {
    return this._httpClient.post(this.endpointBase.concat("Onboarder/Enroll"),
      payload,
      { reportProgress: true, observe: 'events' });
  }

  getEnrollmentsByCourseId(courseId: number) {
    return this._httpClient.get(this.endpointBase.concat("Onboarder/Course/Enrollments/GetAll/" + courseId),
      { reportProgress: true, observe: 'events' });
  }

  getCourseDetails(courseId: number) {
    return this._httpClient.get(this.endpointBase.concat("Course/Get/" + courseId),
      { reportProgress: true, observe: 'events' });
  }
}
