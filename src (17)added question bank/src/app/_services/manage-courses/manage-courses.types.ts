export interface N_questionBank {
  id: number,
  name: string,
  courseId: number,
  courseName: string,
  lessonId: number,
  lessonName: string,
  lessonOutcomeName: string,
  lessonOutcomeId: number
}

export interface N_questionBankWithQuestions {
  id: number,
  name: string,
  courseId: number,
  courseName: string,
  lessonId: number,
  lessonName: string,
  lessonOutcomeName: string,
  lessonOutcomeId: number,
  questions: Array<N_questionInBank>
}

export interface N_questionInBank {
  id: number,
  name: string,
}

export interface N_AnswerOption {
  id: number,
  option: string,
  correct: string,
}

export interface N_Quiz {
  id: number,
  name: string,
  passMarkPercentage: number,
  dueDate: string,
  numberOfQuestions: number,
  LessonOutcomeId: number,
  lessonOutcomeName: string,
  questionBankId: number,
  questionBankName: string,
}
export interface N_Enrollement {
  id: number,
  courseId: number,
  courseName: string,
  onborderId: number,
  onborderFullName: number,
  enrollmentDate: number,
  graduationDate: number
}


export interface N_courseDetails {
  id: number,
  name: string
}
