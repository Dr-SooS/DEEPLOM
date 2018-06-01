import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {HostService} from './host.service';
import {Group} from '../models/Group';
import {Observable} from 'rxjs';
import {Lesson} from '../models/Lesson';

@Injectable()
export class LessonsService extends BaseService {
  constructor(protected http: HttpClient, protected host: HostService) {
    super(http, host);
  }

  getTsiLesson(tsiId: number, date: string) {
    return this.http.get(this.host.host + '/api/lessons/byTsi?tsiId=' + tsiId + '&date=' + date);
  }

  updateLesson(lesson: Lesson) {
    return this.http.put(this.host.host + '/api/lessons/' + lesson.id, lesson);
  }
}
