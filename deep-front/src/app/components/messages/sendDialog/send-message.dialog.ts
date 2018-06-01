import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Message} from '../../../models/Message';
import {User} from '../../../models/User';

@Component({
  selector: 'create-student-dialog',
  templateUrl: 'senf-message.dialog.html',
})
export class SendMessageDialog {

  private message: Message;
  private sender: User;

  constructor(
    public dialogRef: MatDialogRef<SendMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
     resizeBy => this.sender = resizeBy as User
    )
  }

  close() {
    this.message = new Message();
    this.message.text = this.data.message.text;
    this.message.topic = this.data.message.topic;
    this.message.date = new Date().toDateString();
    this.message.userSender = this.sender;
    this.message.userReciever = this.data.receiver;
    return this.dialogRef.close(this.message);
  }

}
