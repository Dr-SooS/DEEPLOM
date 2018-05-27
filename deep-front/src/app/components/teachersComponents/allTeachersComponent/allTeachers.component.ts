import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {Teacher} from '../../../models/Teacher';
import {TeachersService} from '../../../services/teachers.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Specialty} from '../../../models/Specialty';
import {CreateSpecialtyDialog} from '../../specialtiesComponents/allSpecialtiesComponent/allSpecialties.component';
import {filter} from 'rxjs/operators';
import {CollegesService} from '../../../services/colleges.service';
import {User} from '../../../models/User';

@Component({
  selector: 'all-teachers',
  templateUrl: './allTeachers.component.html',
})
export class AllTeachersComponent {

  newTeacher: Teacher = new Teacher();
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private host: HostService,
              private teachersService: TeachersService,
              private router: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private collegeService: CollegesService) { }

  ngOnInit() {
    this.newTeacher.college = new College();
    this.newTeacher.user = new User();
    this.collegeService.getCollege(this.router.snapshot.queryParams['collegeId']).subscribe(res => this.newTeacher.college = res as College);
    this.teachersService.getCollegeTeachers(this.router.snapshot.queryParams['collegeId']).subscribe(res => this.dataSource.data = res as Teacher[]);
  }

  onDelete(id: number) {
    this.teachersService.deleteTeacher(id).subscribe(res => {
      this.teachersService.getCollegeTeachers(this.router.snapshot.queryParams['collegeId']).subscribe(res => this.dataSource.data = res);
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateTeacherDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {teacher: this.newTeacher}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      this.newTeacher = result.teacher;
      this.teachersService.postTeacher(this.newTeacher).subscribe(result => {
        this.teachersService.getCollegeTeachers(this.router.snapshot.queryParams['collegeId']).subscribe(res => {
          this.dataSource.data = res as Teacher[];
          this.snackBar.open('Преподаватель успешно создана', null, {duration: 2000});
        });
      });
    });
  }
}

@Component({
  selector: 'create-teacher-dialog',
  templateUrl: 'create-teacher-dialog.html',
})
export class CreateTeacherDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateTeacherDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
