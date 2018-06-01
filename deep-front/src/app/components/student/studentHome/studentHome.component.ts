import {Component} from '@angular/core';
import {Student} from '../../../models/Student';
import {UsersService} from '../../../services/users.service';
import {StudentsService} from '../../../services/students.service';
import {College} from '../../../models/College';
import {User} from '../../../models/User';


@Component({
  selector: 'student-home',
  templateUrl: './studentHome.component.html',
})
export class StudentHomeComponent {

  student: Student = new Student();

  constructor(
    private userService: UsersService,
    private studentService: StudentsService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.studentService.getStudentByUser((res as User).id).subscribe(res => {
        this.student = res as Student;
      })
    })
  }
}
