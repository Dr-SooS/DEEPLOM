import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {TSI} from '../../../models/TSI';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {TeachersService} from '../../../services/teachers.service';
import {Teacher} from '../../../models/Teacher';
import {TSIsService} from '../../../services/tsi.service';
import {filter} from 'rxjs/operators';
import {SubGroupsService} from '../../../services/subGroups.service';
import {SubGroup} from '../../../models/SubGroup';
import {Semester} from '../../../models/Semester';
import {Subject} from '../../../models/Subject';
import {SemestersService} from '../../../services/semesters.service ';
import {SubjectsService} from '../../../services/subjects.service';

@Component({
  selector: 'all-tsi',
  templateUrl: './allTsi.component.html',
})
export class AllTSIsComponent {

  newTSI: TSI = new TSI();
  dataSource = new MatTableDataSource();
  id: number;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private host: HostService,
              private tsisService: TSIsService,
              private router: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private teachersService: TeachersService) { }

  ngOnInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'semester':
          return (item as TSI).semester.number;
        case 'subject':
          return (item as TSI).subject.name;
        case 'group':
          return (item as TSI).semester.subGroup.name;
        default:
          return item[property];
      }
    }
    this.dataSource.sort = this.sort;
    this.router.params.subscribe(p => this.id = +p['id']);
    this.teachersService.getTeacher(this.id).subscribe(res => this.newTSI.teacher = res as Teacher);
    this.tsisService.getTeacherTSIs(this.id).subscribe(res => this.dataSource.data = res as TSI[]);
  }

  onDelete(id: number) {
    this.tsisService.deleteTSI(id).subscribe(res => {
      this.tsisService.getTeacherTSIs(this.id).subscribe(res => this.dataSource.data = res as TSI[]);
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateTSIDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {tsi: this.newTSI}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      this.newTSI = result;
      this.tsisService.postTSI(this.newTSI).subscribe(result => {
        this.tsisService.getTeacherTSIs(this.id).subscribe(res => {
          this.dataSource.data = res as TSI[];
          this.snackBar.open('Преподаватель успешно назначен', null, {duration: 2000});
        });
      });
    });
  }
}

@Component({
  selector: 'create-tsi-dialog',
  templateUrl: 'create-tsi-dialog.html',
})
export class CreateTSIDialog {

  sbs: SubGroup[] = [];
  selectedSb: SubGroup;

  semesters: Semester[] = [];
  selectedSemester: Semester;

  subjects: Subject[] = [];
  selectedSubject: Subject;


  constructor(
    public dialogRef: MatDialogRef<CreateTSIDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sbService: SubGroupsService,
    private semService: SemestersService,
    private subjService: SubjectsService) { }

  ngOnInit() {
    this.sbService.getCollegeSubGroups(this.data.tsi.teacher.college.id).subscribe(res => {
      this.sbs = res as SubGroup[];
    });

    this.subjService.getCollegeSubjects(this.data.tsi.teacher.college.id).subscribe(res => {
      this.subjects = res as Subject[];
    })
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  changeSelectedSubGroup() {
    this.semService.getSubGroupSemesters(this.selectedSb.id).subscribe(res => {
      this.semesters = res as Semester[];
    });
  }

  close() {
    var tsi = new TSI();
    tsi.teacher = this.data.tsi.teacher;
    tsi.semester = this.selectedSemester;
    tsi.subject = this.selectedSubject;
    this.dialogRef.close(tsi);
  }

}
