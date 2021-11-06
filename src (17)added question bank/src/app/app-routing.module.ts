

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from './_helpers';

import {
  Register_EmployeeComponent,
  Assign_EquipmentComponent,
  OnboarderComponent,
  SS_AdministratorComponent,
  CRUD_FAQComponent,
  CRUD_EmployeeComponent,
  Import_EmployeeComponent,
  AdminDashboardComponent,
  DepartChartComponent,
} from './administrator';

import {
  CourseComponent,
  Assign_CourseComponent,
  Learning_OutcomeComponent,
  Set_QuizComponent,
  Learning_ContentComponent,
  SS_CourseComponent,
  QuestionComponent,
  CRUD_AchievementComponent,
  LessonComponent,
  OptionComponent,
} from './course';

import {
  Take_CourseComponent,
  Take_LessonComponent,
  Take_Learning_OutcomeComponent,
  Take_QuizComponent,
  Take_ContentComponent,
  ProgressComponent,
  FAQComponent,
  QuizComponent,
  BookingComponent,
  SS_OnboarderComponent
} from './onboarder';

import {
  EquipmentComponent,
  SS_EquipmentComponent,
  My_EquipmentComponent,
  EquipDashboardComponent
} from './equipment';

import {
  Assign_User_RoleComponent,
  User_RoleComponent,
  SS_UsersComponent
} from './users';

import {
  ReportComponent,
  SS_ReportComponent,
  Active_LogComponent,
  Audit_LogComponent,
  Equipment_ReportComponent,
  Employee_ReportComponent,
  TradeIn_ReportComponent,
} from './report';

import {
  HomeComponent,
  AboutComponent,
} from './home';

import {
  LoginComponent,
  OTPComponent,
  ForgotPasswordComponent
} from './login';

import {
  AdminComponent
} from './role';

import {
  ProfileComponent,
  AccountComponent
} from './profile';

import { AuthGuard } from './_helpers';
import { Question_BankComponent } from './course/question_bank/question_bank.component';
import { ManageBankQuestionsComponent } from './course/manage-bank-questions/manage-bank-questions.component';
import { ListCourseEnrollmentsComponent } from './course/list-course-enrollments/list-course-enrollments.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    //canActivate: [AuthGuard]
  },

  // {
  //     path: 'admin',
  //     component: AdminComponent,
  //     canActivate: [AuthGuard],
  //     data: { roles: [Role.Admin] }
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'otp',
    component: OTPComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },

  //Role
  {
    path: 'admin',
    component: AdminComponent,
    //canActivate: [AuthGuard]
  },

  //Users path pages
  {
    path: 'ss_users',
    component: SS_UsersComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'assign_user_role',
    component: Assign_User_RoleComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'user_role',
    component: User_RoleComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },

  // //Administrator path pages
  {
    path: 'onboarder',
    component: OnboarderComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'register_employee',
    component: Register_EmployeeComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'ss_administrator',
    component: SS_AdministratorComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'assign_equipment',
    component: Assign_EquipmentComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'crud_faq',
    component: CRUD_FAQComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'import_employee',
    component: Import_EmployeeComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'crud_employee',
    component: CRUD_EmployeeComponent,
    //canActivate: [AuthGuard]
  },

  // //Report path pages
  {
    path: 'ss_report',
    component: SS_ReportComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'active_log',
    component: Active_LogComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'audit_log',
    component: Audit_LogComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'equipment_report',
    component: Equipment_ReportComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'employee_report',
    component: Employee_ReportComponent,
  },
  {
    path: 'tradein_report',
    component: TradeIn_ReportComponent,
  },


  // //Onboarder path pages
  {
    path: 'ss_onboarder',
    component: SS_OnboarderComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'booking',
    component: BookingComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'take_course',
    component: Take_CourseComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'take_lesson/:id',
    component: Take_LessonComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FAQComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'take_learning_outcome/:id',
    component: Take_Learning_OutcomeComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'take_quiz/:id',
    component: Take_QuizComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'take_content/:id',
    component: Take_ContentComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'progress/:id',
    component: ProgressComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
    //canActivate: [AuthGuard]
  },

  // //Course path pages
  {
    path: 'ss_course',
    component: SS_CourseComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'course',
    component: CourseComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'lesson/:id',
    component: LessonComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'assign_course',
    component: Assign_CourseComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'learning_outcome/:id',
    component: Learning_OutcomeComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'learning_content/:id',
    component: Learning_ContentComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin]
  },
  {
    path: 'set_quiz/:id',
    component: Set_QuizComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'crud_achievement',
    component: CRUD_AchievementComponent,
    //canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: 'question/:id',
    component: QuestionComponent,
  },
  {
    path: 'question_bank',
    component: Question_BankComponent,
  },
  {
    path: 'option/:id',
    component: OptionComponent,
    //canActivate: [AuthGuard],
  },

  // //Equipment path pages
  {
    path: 'ss_equipment',
    component: SS_EquipmentComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'equipment',
    component: EquipmentComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'my_equipment',
    component: My_EquipmentComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'equipdashboard',
    component: EquipDashboardComponent,

  },

  //Profile
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },

  { path: 'manage-bank-questions/:bankId', component: ManageBankQuestionsComponent },
  { path: 'course/enrollments/:courseId', component: ListCourseEnrollmentsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
