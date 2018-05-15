import {Component} from '@angular/core';
import {HostService} from './services/host.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Student} from './models/Student';
import {StudentsService} from './services/students.service';
import {Mark} from './models/Mark';
import {Semester} from './models/Semester';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  dates: Date[] = [];

  students: Student[];
  marks: Mark[] = [];

  constructor(
    protected http: HttpClient,
    protected host: HostService,
    protected studentsService: StudentsService,
  ) { }

  ngOnInit() {
    this.http.get(this.host.host + '/api/semesters/' + 1).subscribe(res  => {
      var semester = res as Semester;
      this.dates = this.getDates(new Date(semester.startDate), new Date(semester.endDate));
    });

    this.studentsService.getSubGroupStudents(1).subscribe(res => this.students = res as Student[]);
    this.http.get(this.host.host + '/api/marks/notall?subjectId=1&semesterId=1&teacherId=1').subscribe(res => {
      this.marks = res as Mark[];
    });
  }

  getMark(studentId: number, date: Date): string {
    var mark = this.marks.find(m => m.student.id == studentId && new Date(m.date).getDate() == date.getDate());
    if (mark !== undefined)
      return mark.value.toString();
    else
      return '';
  }

  getDates(startDate: Date, stopDate: Date) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
}
