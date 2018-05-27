import {Component, Inject, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {SubGroup} from '../../../models/SubGroup';
import {SubGroupsService} from '../../../services/subGroups.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CreateGroupDialog} from '../../groupsComponents/allGroupsComponent/allGroups.component';
import {filter} from 'rxjs/operators';
import {Group} from '../../../models/Group';
import {GroupsService} from '../../../services/groups.service';
@Component({
  selector: 'all-subGroups',
  templateUrl: './allSubGroups.component.html',
})
export class AllSubGroupsComponent {

  newSubGroup = new SubGroup();
  subGroups: SubGroup[] = [];
  @Input() groupId: number;

  constructor(private http: HttpClient,
              private host: HostService,
              private subGroupsService: SubGroupsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.subGroupsService.getGroupSubGroups(this.groupId).subscribe(res => {
      this.subGroups = res as SubGroup[];
    });
  }

  onDelete(id: number) {
    this.subGroupsService.deleteSubGroup(id).subscribe(res => {
      this.subGroupsService.getGroupSubGroups(this.groupId).subscribe(res => {
        this.subGroups = res as SubGroup[];
        this.snackBar.open("Подгруппа успешно удалена", null, {duration: 2000});
      });
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateSubGroupDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {name: this.newSubGroup.name, college: this.newSubGroup.group}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      this.newSubGroup = result;
      this.subGroupsService.postSubGroup(this.newSubGroup).subscribe(result => {
        this.subGroupsService.getGroupSubGroups(this.groupId).subscribe(res => {
          this.subGroups = res as SubGroup[];
          this.snackBar.open('Подгруппа успешно создана', null, {duration: 2000});
        });
      });
    });
  }
}

@Component({
  selector: 'create-subGroup-dialog',
  templateUrl: 'create-subGroup-dialog.html',
})
export class CreateSubGroupDialog {

  groups: Group[];

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups().subscribe(res => this.groups = res as Group[]);
  }

}
