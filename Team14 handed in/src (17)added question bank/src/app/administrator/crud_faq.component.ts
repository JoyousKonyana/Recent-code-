
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { FAQ } from '../_models';
import { FAQService, AuthenticationService, AlertService } from '../_services';

@Component({ 
    templateUrl: 'crud_faq.component.html',
    styleUrls: ['./ss_administrator.component.css'] 
})

export class CRUD_FAQComponent implements OnInit {
  faq: any[] = [];

  constructor(
      private faqService: FAQService,
      private alertService: AlertService
  ) {

  }

  ngOnInit() { 
      this.loadAllFAQ();
  }

  private loadAllFAQ() {
    this.faqService.getAllFAQ()
    .pipe(first())
    .subscribe(
      faq => {
        this.faq = faq;
      },
      error => {
        this.alertService.error('Error, Data was unsuccesfully retrieved');
      } 
    );
  }

    newFAQClicked = false;

  model: any = {};
  model2: any = {}; 
  
  model3:FAQ = {
    Faqanswer: '',
    Faqdescription:'',
    Faqid:1
  };
  
  addFAQ() { 
    this.model3.Faqanswer=this.model.Faqanswer;
    this.model3.Faqdescription = this.model.Faqdescription;

    if(Object.keys(this.model).length < 2)
    {
      this.alertService.error("Error, you have an empty feild");
      console.log('Empty');
      this.newFAQClicked = !this.newFAQClicked;
      this.model = {};
    }
    else if((Object.keys(this.model).length == 2))
    {
      this.faqService.create(this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Creation was successful', true);
                    this.loadAllFAQ();
                    this.newFAQClicked = !this.newFAQClicked;
                    this.model = {};
                },
                error => {
                  this.alertService.error('Error, Creation was unsuccesful');
              });
    }
  }
    
  
  deleteFAQ(i:number) {
    this.faqService.delete(Number(i))
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion was successful', true);

                    this.loadAllFAQ();
                    console.log(i);
                },
                error => {
                    this.alertService.error('Error, Deletion was unsuccesful');
                });
  }

  myValue = 0;

  editFAQ(editFAQInfo: number) {
    this.model2.Faqdescription = this.faq[editFAQInfo].faqdescription;
    this.model2.Faqanswer = this.faq[editFAQInfo].faqanswer;
    this.myValue = editFAQInfo;
  }

  updateFAQ() {
    let editFAQInfo = this.myValue;

    this.model3.Faqid = this.faq[editFAQInfo].faqid;
    this.model3.Faqanswer=this.model2.Faqanswer;
    this.model3.Faqdescription = this.model2.Faqdescription;

    for(let i = 0; i < this.faq.length; i++) {

      if(i == editFAQInfo) 
      {
        this.faqService.update(this.model3.Faqid, this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update was successful', true);
                    this.loadAllFAQ();
                    this.model2 = {};
                },
                error => {
                    this.alertService.error('Error, Update was unsuccesful');
                });
      }
    }
    }

    addNewFAQBtn() {
        this.newFAQClicked = !this.newFAQClicked;
      }

}