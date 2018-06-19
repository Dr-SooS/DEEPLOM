import {Component} from '@angular/core';
import {Director} from '../../models/Director';
import {College} from '../../models/College';
import {UsersService} from '../../services/users.service';
import {DirectorsService} from '../../services/directors.service';
import {User} from '../../models/User';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/Message';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {

  incoming: boolean;

  header: string;
  user: User = new User();
  messages: Message[] = [];

  constructor(
    private userService: UsersService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res as User;
      this.getIncoming();
    })
  }

  getIncoming() {
    this.messageService.getIncomingMessages(this.user.id).subscribe(res => {
      this.messages = res as Message[];
      this.header = "Входящие";
      this.incoming = true;
    });
  }

  getSent() {
    this.messageService.getSentMessages(this.user.id).subscribe(res => {
      this.messages = res as Message[];
      this.header = "Отправленные";
      this.incoming = false;
    });
  }
}
