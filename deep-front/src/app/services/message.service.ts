import {Injectable} from '@angular/core';
import {HostService} from './host.service';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Message} from '../models/Message';

@Injectable()
export class MessageService extends BaseService{
  constructor(protected http: HttpClient, protected host: HostService) {
    super(http, host);
  }

  getIncomingMessages(userId: string) {
    return this.http.get(this.host.host + '/api/messages/received/user/' + userId);
  }

  getSentMessages(userId: string) {
    return this.http.get(this.host.host + '/api/messages/sent/user/' + userId);
  }

  sendMessage(message: Message) {
    return this.http.post(this.host.host + '/api/messages/', message);
  }

  getMessage(id: number) {
    return this.http.get(this.host.host + '/api/messages/' + id);
  }
}
