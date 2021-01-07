import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {DragDropComponent} from './drag-drop/drag-drop.component';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './service/auth/auth.service';
import {RegisterComponent} from './register/register.component';
import { AgendaComponent } from './widgets/agenda/agenda.component';
import { NoteComponent } from './widgets/note/note.component';
import { SnoteComponent } from './widgets/note/note/snote.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AgendaComponent, 
    NoteComponent, 
    SnoteComponent, 
    DragDropComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],

  bootstrap: [AppComponent],
  entryComponents: [DragDropComponent]

})
export class AppModule {
}
