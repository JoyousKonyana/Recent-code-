export class RegisterEmployee{
    EmployeeId!: number;
    DepartmentId!: number;
    UserRoleID!: number;
    GenderId!: number;
    AddressId: number | undefined;
    EmployeeCalendarId: number | undefined;
    FirstName!: string;
    LastName!: string;
    MiddleName!: string;
    Idnumber!: number;
    EmailAddress!: string;
    ContactNumber!: number;
    TitleId!: number;
    EmployeeJobTitle!: string; //Not added
    SuburbId!: number;
    ProvinceId!: number;
    CityId!: number;
    CountryId!: number;
    StreetNumber!: number;
    StreetName!: string;
}