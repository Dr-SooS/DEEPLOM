import {Component, Inject, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {GroupsService} from '../../../services/groups.service';
import {Group} from '../../../models/Group';
import {CreateSpecialtyDialog} from '../../specialtiesComponents/allSpecialtiesComponent/allSpecialties.component';
import {Specialty} from '../../../models/Specialty';
import {filter} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {College} from '../../../models/College';
import {CollegesService} from '../../../services/colleges.service';
import {SpecialtiesService} from '../../../services/specialties.service';

@Component({
  selector: 'all-groups',
  templateUrl: './allGroups.component.html',
})
export class AllGroupsComponent {

  dataSource = new MatTableDataSource();
  newGroup = new Group();

  @Input() specialtyId: number;

  constructor(private http: HttpClient,
              private host: HostService,
              private groupsService: GroupsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.groupsService.getSpecilatyGroups(this.specialtyId).subscribe(res => this.dataSource.data = res as Group[]);
  }

  onDelete(id: number) {
    this.groupsService.deleteGroup(id).subscribe(res => {
      this.groupsService.getSpecilatyGroups(this.specialtyId).subscribe(res => {
        this.dataSource.data = res as Group[];
        this.snackBar.open("Группа успешно удалена", null, {duration: 2000})
      });
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateGroupDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {name: this.newGroup.number, college: this.newGroup.specialty}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      this.newGroup = result;
      this.groupsService.postGroup(this.newGroup).subscribe(result => {
        this.groupsService.getSpecilatyGroups(this.specialtyId).subscribe(res => {
          this.dataSource.data = res as Group[];
          this.snackBar.open('Группа успешно создана', null, {duration: 2000});
        });
      });
    });
  }
}

@Component({
  selector: 'create-group-dialog',
  templateUrl: 'create-group-dialog.html',
})
export class CreateGroupDialog {

  specialties: Specialty[];

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private specialtiesService: SpecialtiesService) { }

  ngOnInit() {
    this.specialtiesService.getSpecialties().subscribe(res => this.specialties = res as Specialty[]);
  }

}
