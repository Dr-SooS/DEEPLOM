import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { CookieModule } from 'ngx-cookie';
import { FormsModule } from '@angular/forms';
import { HostService } from './services/host.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: 'admin', loadChildren: './components/admin/admin.module#AdminModule'},
    ])
  ],
  providers: [
    HostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
