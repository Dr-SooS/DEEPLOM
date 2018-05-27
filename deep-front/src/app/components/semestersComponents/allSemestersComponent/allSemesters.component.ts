import {Component, Inject, Input, OnInit} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {SemestersService} from '../../../services/semesters.service ';
import {Semester} from '../../../models/Semester';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Group} from '../../../models/Group';
import {filter} from 'rxjs/operators';
import {CreateGroupDialog} from '../../groupsComponents/allGroupsComponent/allGroups.component';
import {Specialty} from '../../../models/Specialty';
import {SpecialtiesService} from '../../../services/specialties.service';
import {SubGroup} from '../../../models/SubGroup';
import {SubGroupsService} from '../../../services/subGroups.service';

@Component({
  selector: 'all-semesters',
  templateUrl: './allSemesters.component.html',
})
export class AllSemestersComponent {

  dataSource = new MatTableDataSource();
  newSemester = new Semester();

  @Input() groupId: number;

  constructor(private http: HttpClient,
              private host: HostService,
              private semestersService: SemestersService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.semestersService.getGroupSemesters(this.groupId).subscribe(res => this.dataSource.data = res as Semester[]);
  }

  onDelete(id: number) {
    this.semestersService.deleteSemester(id).subscribe(res => {
      this.semestersService.getSemesters().subscribe(res => this.dataSource.data = res as Semester[]);
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateSemesterDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {semester: this.newSemester, groupId: this.groupId}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      this.newSemester = result;
      this.semestersService.postSemester(this.newSemester).subscribe(result => {
        this.semestersService.getGroupSemesters(this.groupId).subscribe(res => {
          this.dataSource.data = res as Semester[];
          this.snackBar.open('Семестр успешно добавлен', null, {duration: 2000});
        });
      });
    });
  }

}


@Component({
  selector: 'create-semester-dialog',
  templateUrl: 'create-semester-dialog.html',
})
export class CreateSemesterDialog {

  subGroups: SubGroup[];

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sbService: SubGroupsService) { }

  ngOnInit() {
    this.sbService.getGroupSubGroups(this.data.groupId).subscribe(res => this.subGroups = res as SubGroup[]);
  }

  close() {
    var semester = new Semester();
    semester.number = this.data.semester.number;
    semester.subGroup = this.data.semester.subGroup;
    semester.startDate = this.convertDate(this.data.semester.startDate);
    semester.endDate = this.convertDate(this.data.semester.endDate);
    this.dialogRef.close(semester);
  }

  convertDate(date: Date) {
    return date.getFullYear() + '-' + this.addSigns(date.getMonth() + 1)+ '-' + this.addSigns(date.getDate());
  }

  addSigns(number: number) {
    if (number >= 10)
      return number;
    else
      return '0' + number
  }

}
