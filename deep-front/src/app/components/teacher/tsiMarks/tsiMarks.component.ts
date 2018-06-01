import {Component, Inject} from '@angular/core';
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
import {TSI} from '../../../models/TSI';
import {TSIsService} from '../../../services/tsi.service';
import {LessonsService} from '../../../services/lessons.service';
import {CreateTSIDialog} from '../../tsiComponents/allTsiComponent/allTeacherTsi.component';
import {filter} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {variable} from '@angular/compiler/src/output/output_ast';
import {Topic} from '../../../models/Topic';
import {TopicsService} from '../../../services/topics.service';

@Component({
  selector: 'marks',
  templateUrl: './tsiMarks.component.html',
})
export class TsiMarksComponent {

  tsi: TSI = new TSI();

  monthDates = [];

  students: Student[];
  marks: Mark[] = [];

  tsiId: number;

  constructor(
    protected activatedRouter: ActivatedRoute,
    protected router: Router,
    protected http: HttpClient,
    protected host: HostService,
    protected studentsService: StudentsService,
    protected tsiService: TSIsService,
    protected lessons: LessonsService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tsiId = this.activatedRouter.snapshot.queryParams.tsiId;
    this.tsiService.getTSI(this.tsiId).subscribe(res => {
      this.tsi = res as TSI;
      this.monthDates = this.getMonthDates(new Date(this.tsi.semester.startDate), new Date(this.tsi.semester.endDate));
      this.studentsService.getSubGroupStudents(this.tsi.semester.subGroup.id).subscribe(res => this.students = res as Student[]);
    });
    this.reloadMarks();
  }

  reloadMarks() {
    this.http.get(this.host.host + '/api/marks/byTsi?tsiId=' + this.tsiId).subscribe(res => {
      this.marks = res as Mark[];
      console.log(this.marks);
    });
  }

  findMark(studentId: number, date: Date): Mark {
    return this.marks.find(m => m.student.id == studentId &&
      (new Date(m.lesson.date).getFullYear() == date.getFullYear() &&
        new Date(m.lesson.date).getMonth() == date.getMonth() &&
        new Date(m.lesson.date).getDate() == date.getDate()));
  }

  getMonthDates(startDate: Date, stopDate: Date) {
    var monthArray = [{month: startDate.getMonth(), dates: []}];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      if (currentDate.getMonth() > monthArray[monthArray.length - 1].month)
        monthArray.push({month: currentDate.getMonth(), dates: []});
      monthArray[monthArray.length - 1].dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return monthArray;
  }

  updateMark(event, mark: Mark, date: Date, student: Student) {
    if (mark !== undefined) {
      if (event.target.value === 'н') {
        mark.isAbsent = true;
        mark.value = undefined;
        this.lessons.getTsiLesson(this.tsi.id, date.toDateString()).subscribe(res => {
          mark.lesson = res as Lesson;
          this.http.put(this.host.host + '/api/marks/' + mark.id, mark).subscribe();
        });
      }
      else if (event.target.value == '') {
        this.http.delete(this.host.host + '/api/marks/' + mark.id).subscribe();
      }
      else {
        mark.value = event.target.value;
        mark.isAbsent = false;
        this.lessons.getTsiLesson(this.tsi.id, date.toDateString()).subscribe(res => {
          mark.lesson = res as Lesson;
          this.http.post(this.host.host + '/api/marks', mark).subscribe();
        });
      }
    }
    else {
      mark = new Mark();
      mark.student = student;
      if (event.target.value == 'н') {
        mark.isAbsent = true;
        mark.value = undefined;
        this.lessons.getTsiLesson(this.tsi.id, date.toDateString()).subscribe(res => {
          mark.lesson = res as Lesson;
          this.http.post(this.host.host + '/api/marks', mark).subscribe();
        });
      }
      else if (event.target.value === '') {
        return;
      }
      else {
        mark.value = event.target.value;
        mark.isAbsent = false;
        mark.student = student;
        this.lessons.getTsiLesson(this.tsi.id, date.toDateString()).subscribe(res => {
          mark.lesson = res as Lesson;
          this.http.post(this.host.host + '/api/marks', mark).subscribe();
        });
      }
    }
  }

  getMarkText(mark: Mark): string {
    if (mark != undefined)
      if (mark.isAbsent)
        return 'н';
      else
        return mark.value.toString();
    else
      return '';
  }

  getMonthName(month: number) {
    var names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return names[month];
  }

  updateTopic(date: Date) {
    let dialogRef = this.dialog.open(ChangeLessonTopicDialog, {
      hasBackdrop: true,
      autoFocus: true,
      data: {tsi: this.tsi, date: date}
    });

    dialogRef.afterClosed().pipe(filter(res => res !== undefined)).subscribe(result => {
      var lesson = result;
      this.lessons.updateLesson(lesson).subscribe(result => {
        this.snackBar.open('Тема успешно изменена', null, {duration: 2000});
      });
    });
  }
}

@Component({
  selector: 'change-topic',
  templateUrl: 'change-topic-dialog.html',
})
export class ChangeLessonTopicDialog {

  topics: Topic[] = [];
  selectedTopic: Topic;

  lesson: Lesson;

  constructor(
    public dialogRef: MatDialogRef<CreateTSIDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private topicsService: TopicsService,
    private lessons: LessonsService
  ) { }

  ngOnInit() {
    this.topicsService.getSubjectTopics(this.data.tsi.subject.id).subscribe(res => {
      this.topics = res as Topic[];
    });
    this.lessons.getTsiLesson(this.data.tsi.id, this.data.date.toDateString()).subscribe(res => this.lesson = res as Lesson);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  close() {
    this.lesson.topic = this.selectedTopic;
    this.dialogRef.close(this.lesson);
  }

}
