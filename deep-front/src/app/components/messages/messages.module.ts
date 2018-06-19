import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material.module';
import {UsersService} from '../../services/users.service';
import {MessageService} from '../../services/message.service';
import {MessageComponent} from './details/message.component';
import {MessagesComponent} from './messages.component';
import {SendMessageDialog} from './sendDialog/send-message.dialog';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: MessagesComponent},
      {path: 'message/:id', component: MessageComponent},
    ])
  ],
  providers: [
    UsersService,
    MessageService
  ]
})

export class MessagesModule {
}
