import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {CollegesService} from '../../../services/colleges.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'all-colleges',
  templateUrl: './allColleges.component.html',
})
export class AllCollegesComponent {

  colleges: College[];
  newCollege: College = new College();
  dataSource = new MatTableDataSource(this.colleges);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private host: HostService,
              private collegesService: CollegesService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.collegesService.getColleges().subscribe(res => {
      this.colleges = res;
      this.dataSource.data = this.colleges;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(id: number) {
    this.collegesService.deleteCollege(id).subscribe(res => {
      this.collegesService.getColleges().subscribe(res => {
        this.colleges = res;
        this.dataSource.data = this.colleges;
        this.snackBar.open('Колледж успешно удален', null, {duration: 2000})
      });
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateCollegeDialog, {
      autoFocus: true,
      hasBackdrop: true,
      data: {name: this.newCollege.name}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== "")).subscribe(result => {
      this.newCollege = result;
      this.collegesService.postCollege(this.newCollege).subscribe(result => {
        this.collegesService.getColleges().subscribe(res => {
          this.colleges = res;
          this.dataSource.data = this.colleges;
          this.snackBar.open('Колледж успешно создан', null, {duration: 2000})
        });
      });
    });
  }
}

@Component({
  selector: 'create-college-dialog',
  templateUrl: 'create-college-dialog.html',
})
export class CreateCollegeDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateCollegeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
