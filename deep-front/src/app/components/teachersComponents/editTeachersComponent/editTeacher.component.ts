import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Teacher} from "../../../models/Teacher";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/User";
import {College} from "../../../models/College";
import {TeachersService} from "../../../services/teachers.service";
import {CollegesService} from "../../../services/colleges.service";
import {LessonsService} from '../../../services/lessons.service';
import {filter} from 'rxjs/operators';
import {CreateTeacherDialog} from '../allTeachersComponent/allTeachers.component';
import {MatDialog} from '@angular/material';
import {SendMessageDialog} from '../../messages/sendDialog/send-message.dialog';

@Component({
	selector: 'edit-teacher',
	templateUrl: './editTeacher.component.html',
})
export class EditTeacherComponent{

	teacher: Teacher = new Teacher();
	@Input() id: number;

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private teachersService: TeachersService,
    private dialog: MatDialog,
	) {}


	ngOnInit() {
		this.teacher.user = new User();

		if (this.id === undefined)
		  this.router.params.subscribe(p => this.id = +p['id']);
		this.teachersService.getTeacher(this.id).subscribe(res => this.teacher = res as Teacher);
	}

	onUpdate() {
		this.teachersService.putTeacher(this.id, this.teacher).subscribe();
	}

  openSendMessageDialog() {
    let dialogRef = this.dialog.open(SendMessageDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {receiver: this.teacher.user}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      console.log(result);
    });
  }
}
