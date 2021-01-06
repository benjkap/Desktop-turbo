import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './service/auth/auth.service';
import {RegisterComponent} from './register/register.component';
import { AgendaComponent } from './widgets/agenda/agenda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AgendaComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    ScheduleAllModule,
     RecurrenceEditorAllModule 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
 // schémas : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
