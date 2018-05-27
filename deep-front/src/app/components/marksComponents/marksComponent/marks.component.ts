import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../../../models/Student';
import {Mark} from '../../../models/Mark';
import {HostService} from '../../../services/host.service';
import {StudentsService} from '../../../services/students.service';
import {Semester} from '../../../models/Semester';
import {Teacher} from '../../../models/Teacher';
import {TeachersService} from '../../../services/teachers.service';
import {Subject} from '../../../models/Subject';
import {SubjectsService} from '../../../services/subjects.service';
import {SubGroup} from '../../../models/SubGroup';
import {SubGroupsService} from '../../../services/subGroups.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SemestersService} from '../../../services/semesters.service ';
import {Lesson} from '../../../models/Lesson';

@Component({
  selector: 'marks',
  templateUrl: './marks.component.html',
})
export class MarksComponent {

  subGroups: SubGroup[];
  selectedSubGroup: SubGroup;

  teachers: Teacher[] = [];
  selectedTeacher: Teacher;

  subjects: Subject[] = [];
  selectedSubject: Subject;

  semesters: Semester[];
  selectedSemester: Semester;

  dates: Date[] = [];

  students: Student[];
  marks: Mark[] = [];

  constructor(
    protected activatedRouter: ActivatedRoute,
    protected router: Router,
    protected http: HttpClient,
    protected host: HostService,
    protected studentsService: StudentsService,
    protected teacherService: TeachersService,
    protected subjectService: SubjectsService,
    protected subGroupService: SubGroupsService,
    protected semestersService: SemestersService,
  ) { }

  ngOnInit() {
    this.subGroupService.getSubGroups().subscribe(res => this.subGroups = res);
  }

  reloadMarks() {
    this.http.get(this.host.host + '/api/marks/notall?subjectId=' + this.selectedSubject.id + '&semesterId=' + this.selectedSemester.id + '&teacherId=' + this.selectedTeacher.id).subscribe(res => {
      this.marks = res as Mark[];
    });
  }

  findMark(studentId: number, date: Date): Mark {
    return this.marks.find(m => m.student.id == studentId && new Date(m.lesson.date).getDate() == date.getDate());
  }

  getDates(startDate: Date, stopDate: Date) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  updateMark(event, mark: Mark, date: Date) {
    mark.value = event.target.value;

    var strDate = date.toDateString();

    this.http.get(this.host.host + '/api/lessons/notall?subjectId=' + this.selectedSubject.id + '&semesterId=' + this.selectedSemester.id + '&teacherId=' + this.selectedTeacher.id + '&date=' + strDate).subscribe(res => {
      mark.lesson = res as Lesson
    });

    this.http.put(this.host.host + '/api/marks/' + mark.id, mark).subscribe()
  }

  getMarkText(mark: Mark): string {
    if (mark != undefined)
      return mark.value.toString();
    else
      return '';
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2
  }

  changeSelectedTeacher() {
    this.subjectService.getTeacherSubjects(this.selectedTeacher.id, this.selectedSubGroup.id).subscribe(res => {
      this.subjects = res as Subject[];
    })
  }

  changeSelectedSubject() {
    this.semestersService.getSubjectGroupSemesters(this.selectedTeacher.id, this.selectedSubGroup.id, this.selectedSubject.id).subscribe(res => {
      this.semesters = res as Semester[];
    })
  }

  changeSelectedSubGroup() {
    this.teacherService.getSubGroupTeachers(this.selectedSubGroup.id).subscribe( res => {
      this.teachers = res as Teacher[];
    });

    this.studentsService.getSubGroupStudents(this.selectedSubGroup.id).subscribe(res => {
      this.students = res as Student[];
    });
  }

  changeSelectedSemester() {
    this.dates = this.getDates(new Date(this.selectedSemester.startDate), new Date(this.selectedSemester.endDate))
    this.reloadMarks();
  }
}
