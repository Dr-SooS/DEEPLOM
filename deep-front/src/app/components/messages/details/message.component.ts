import {Component} from '@angular/core';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
})
export class MessageComponent {

  message: Message;
  id: number;

  constructor(
    private messageService: MessageService,
    private acticatedRouter: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.acticatedRouter.snapshot.params.id;
    this.messageService.getMessage(this.id).subscribe(res => {
      this.message = res as Message;
    });
  }
}
