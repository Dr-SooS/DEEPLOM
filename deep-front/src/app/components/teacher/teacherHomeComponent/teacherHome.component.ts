import {Component} from '@angular/core';
import {Teacher} from '../../../models/Teacher';
import {UsersService} from '../../../services/users.service';
import {TeachersService} from '../../../services/teachers.service';
import {College} from '../../../models/College';
import {User} from '../../../models/User';


@Component({
  selector: 'teacher-home',
  templateUrl: './teacherHome.component.html',
})
export class TeacherHomeComponent {

  teacher: Teacher = new Teacher();

  constructor(
    private userService: UsersService,
    private teacherService: TeachersService) {}

  ngOnInit() {
    this.teacher.college = new College();
    this.userService.getUser().subscribe(res => {
      this.teacherService.getTeacherByUser((res as User).id).subscribe(res => {
        this.teacher = res as Teacher;
      })
    })
  }
}
