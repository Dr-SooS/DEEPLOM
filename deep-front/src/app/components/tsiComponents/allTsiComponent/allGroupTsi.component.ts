import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {College} from '../../../models/College';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {TSI} from '../../../models/TSI';
import {ActivatedRoute, Router} from '@angular/router';
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
import {GroupsService} from '../../../services/groups.service';

@Component({
  selector: 'all-tsi',
  templateUrl: './allGroupTsi.component.html',
})
export class AllGroupTsiComponent {

  newTSI: TSI = new TSI();
  dataSource = new MatTableDataSource();
  @Input()id: number;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private host: HostService,
              private tsisService: TSIsService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private groupsService: GroupsService,
              private router: Router) { }

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
    if (this.id === undefined)
      this.activatedRoute.params.subscribe(p => this.id = +p['id']);
    this.tsisService.getGroupTSIs(this.id).subscribe(res => this.dataSource.data = res as TSI[]);
  }

  onDelete(id: number) {
    this.tsisService.deleteTSI(id).subscribe(res => {
      this.tsisService.getGroupTSIs(this.id).subscribe(res => this.dataSource.data = res as TSI[]);
    });
  }

}
