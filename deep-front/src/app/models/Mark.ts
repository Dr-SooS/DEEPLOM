import {Student} from './Student';
import {Lesson} from './Lesson';

export class Mark {
  id: number;
  value: number;
  isCredited: boolean;
  isAbsent: boolean;
  lesson: Lesson;
  student: Student;
}
