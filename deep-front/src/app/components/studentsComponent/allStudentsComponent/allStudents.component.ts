import {Component, Inject, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {Student} from '../../../models/Student';
import {StudentsService} from '../../../services/students.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Group} from '../../../models/Group';
import {CreateGroupDialog} from '../../groupsComponents/allGroupsComponent/allGroups.component';
import {filter} from 'rxjs/operators';
import {SpecialtiesService} from '../../../services/specialties.service';
import {Specialty} from '../../../models/Specialty';
import {SubGroup} from '../../../models/SubGroup';
import {SubGroupsService} from '../../../services/subGroups.service';
import {User} from '../../../models/User';

@Component({
  selector: 'all-students',
  templateUrl: './allStudents.component.html',
})
export class AllStudentsComponent {

  dataSource = new MatTableDataSource();
  newStudent = new Student();

  @Input() sbId: number;

  constructor(private http: HttpClient,
              private host: HostService,
              private studentsService: StudentsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.newStudent.user = new User();
    this.studentsService.getSubGroupStudents(this.sbId).subscribe(res => this.dataSource.data = res as Student[]);
  }

  onDelete(id: number) {
    this.studentsService.deleteStudent(id).subscribe(res => {
      this.studentsService.getSubGroupStudents(this.sbId).subscribe(res => {
        this.dataSource.data = res as Student[];
        this.snackBar.open("Данные об учащемся успешно удалены");
      });
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateStudentDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {
        student: this.newStudent}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      this.newStudent = result.student;
      this.studentsService.postStudent(this.newStudent).subscribe(result => {
        this.studentsService.getSubGroupStudents(this.sbId).subscribe(res => {
          this.dataSource.data = res as Student[];
          this.snackBar.open('Данные об учащемся успешно созданы', null, {duration: 2000});
        });
      });
    });
  }
}

@Component({
  selector: 'create-student-dialog',
  templateUrl: 'create-student-dialog.html',
})
export class CreateStudentDialog {

  subGroups: SubGroup[];

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subGroupsService: SubGroupsService) { }

  ngOnInit() {
    this.subGroupsService.getSubGroups().subscribe(res => this.subGroups = res as SubGroup[]);
  }

}
