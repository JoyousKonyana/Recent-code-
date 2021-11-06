import { EmployeeService, AlertService } from './../_services';
import { Component, VERSION ,ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

  export class CsvData {
    public DepartmentDescription!: any;
    public UserRoleName!: any;
    public GenderDescription!: any;
    public FirstName!: any;
    public LastName!: any;
    public MiddleName!: any;
    public Idnumber!: Number;
    public EmailAddress!: any;
    public ContactNumber!: Number;
    public EmployeeJobTitle!: string;
    public TitleDescription!: any;
    public SuburbName!: any;
    public ProvinceName!: any;
    public Country!: any;
    public CountryName!: any;
    public StreetNumber!: any;
    public StreetName!: any;
}





@Component({
  selector: 'my-app',
  templateUrl: './import_employee.component.html',
  
})
export class Import_EmployeeComponent  {

  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService
  ) {

  } 

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();

        csvRecord.DepartmentDescription = curruntRecord[0].trim();
        csvRecord.UserRoleName = curruntRecord[1].trim();
        csvRecord.GenderDescription = curruntRecord[2].trim();
        csvRecord.FirstName = curruntRecord[3].trim();
        csvRecord.LastName = curruntRecord[4].trim();
        csvRecord.MiddleName = curruntRecord[5].trim();
        csvRecord.Idnumber = Number(curruntRecord[6].trim());
        csvRecord.EmailAddress = curruntRecord[7].trim();
        csvRecord.ContactNumber = Number(curruntRecord[8].trim());
        csvRecord.EmployeeJobTitle = curruntRecord[9].trim();
        csvRecord.TitleDescription = Number(curruntRecord[10].trim());
        csvRecord.SuburbName = curruntRecord[11].trim();
        csvRecord.ProvinceName = curruntRecord[12].trim();
        csvRecord.Country = curruntRecord[13].trim();
        csvRecord.CountryName = curruntRecord[14].trim();
        csvRecord.StreetNumber = curruntRecord[15].trim();
        csvRecord.StreetName = curruntRecord[16].trim();

        csvArr.push(csvRecord);
      }
      else{
        this.alertService.error('Error, Import Feilds are too short, so Import was unsuccesful');
      }
    }
    return csvArr;
  }

//check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  pushData(){
    this.employeeService.RegisterEmployeeFromImport(this.records)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Import was successful', true);
                },
                error => {
                  this.alertService.error('Error, Import was unsuccesful');
              });
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }

  getJsonData(){
    this.jsondatadisplay = JSON.stringify(this.records);
  }

  // let arr: any[] = [];  
  // Object.keys(csvArr).map(function(key){  
  //   arr.push({[key]:employees[key]})  
  //   return arr;  
  // }); 

}
