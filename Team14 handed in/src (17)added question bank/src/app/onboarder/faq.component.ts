import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { FAQ } from '../_models';
import { FAQService, AlertService, AuthenticationService } from '../_services';

@Component({ 
    templateUrl: 'faq.component.html',
    styleUrls: ['./ss_onboarder.component.css']
})
export class FAQComponent implements OnInit {
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


  //Remove this bad boy
  testData() {
    this.faq.push(
      { faqid: 1, faqdescription: 'Where is x page', faqanswer: 'In y page'},
      { faqid: 2, faqdescription: 'Where is y page', faqanswer: 'In x page'},
      { faqid: 3, faqdescription: 'What is z', faqanswer: 'It is Z'},
      { faqid: 4, faqdescription: 'When is q', faqanswer: 'It is Q'},
    )
  }

}