import {User} from './User';

export class Message {
  id: number;
  topic: string;
  text: string;
  userSender: User;
  userReciever: User;
  date: string;
}
