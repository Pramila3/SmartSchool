import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/pages/common/loading/loader.service";
import { CommonService } from "src/app/pages/services/common.service";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: "app-add-staff-substitude",
  templateUrl: "./add-staff-substitude.component.html",
  styleUrls: ["./add-staff-substitude.component.scss"],
})
export class AddStaffSubstitudeComponent implements OnInit {
  displayedColumns: string[] = [
    "date",
    "class",
    "subject",
    "period",
    "subtitute",
    "Action",
  ];
  dataSource: any;
  selectedValue: string | undefined;
  selectedValuesetting: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any;
  form: FormGroup | any;
  submitted!: boolean;

  BindStaffList: any = [];
  searchValue: string = "";
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: CommonService,
    private cdr: ChangeDetectorRef,
    private loader: LoaderService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getStaffList();
    this.formGroup();
  }
  

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;

  //   this.paginator.page.subscribe((event) => {
  //     // Log or console.log the event to check if it's emitting the correct information
  //     console.log(event);
  //   });
  // }
  formGroup() {
    this.form = this.fb.group({
      staff: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    });
  }
  getStaffList() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
    };
    this.service
      .getHttpServiceWithDynamicParams(postData, "substituteStaffDropDown")
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.BindStaffList = response.resultData;
            this.cdr.detectChanges();
            this.loader.hide();
          } else {
            this.loader.hide();
          }
        },
        (error) => {
          this.loader.hide();
        }
      );
  }

  get filteredStaffList() {
    const lowerCaseSearch = this.searchValue?.toLowerCase();
    return this.BindStaffList.filter((element: any) =>
      element?.staff?.toLowerCase().includes(lowerCaseSearch)
    );
  }
  applyStaffFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
    console.log("StaffFilter", inputValue);
  }

  getStaffSubstituteGrid() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
      datefrom: this.form.value.fromDate
        ? this.datePipe.transform(this.form.value.fromDate, "dd/MM/yyyy")
        : "",
      dateto: this.form.value.toDate
        ? this.datePipe.transform(this.form.value.toDate, "dd/MM/yyyy")
        : "",
      staffcode: this.form.value.staff,
    };
    this.service
      .getHttpServiceWithDynamicParams(postData, "getStaffSubstituteGrid")
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.dataSource = new MatTableDataSource(response.resultData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.loader.hide();
          } else {
            this.loader.hide();
          }
        },
        (error) => {
          this.loader.hide();
        }
      );
  }

  getFreeStaffList(data: any) {
    this.router.navigate(["/timetable/selectedstafflist"], {
      state: { data: data },
    });
  }
}
