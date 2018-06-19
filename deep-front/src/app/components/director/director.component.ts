import {Component, Inject} from '@angular/core';
import {Director} from '../../models/Director';
import {College} from '../../models/College';
import {UsersService} from '../../services/users.service';
import {DirectorsService} from '../../services/directors.service';
import {User} from '../../models/User';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {filter} from 'rxjs/operators';
import {SubGroup} from '../../models/SubGroup';
import {CreateGroupDialog} from '../groupsComponents/allGroupsComponent/allGroups.component';

@Component({
	selector: 'director',
	templateUrl: './director.component.html',
})
export class DirectorComponent {

  director: Director = new Director();

	constructor(
	  private userService: UsersService,
    private directorService: DirectorsService,
    private dialog: MatDialog) {}

	ngOnInit() {
	  this.director.college = new College();
	  this.userService.getUser().subscribe(res => {
	    this.directorService.getDirectorByUser((res as User).id).subscribe(res => {
	      this.director = res as Director;
      })
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(GenerateReportDialog, {
      hasBackdrop: true,
      autoFocus: true});

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {});
  }
}

@Component({
  selector: 'generate-report-dialog',
  templateUrl: 'generate-report-dialog.html',
})
export class GenerateReportDialog {

  subGroups: SubGroup[];

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
