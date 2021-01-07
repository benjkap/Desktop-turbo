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
import { AgendaComponent } from './widget/agenda/agenda.component';
import { NoteComponent } from './widget/note/note.component';
import { SnoteComponent } from './widget/note/note/snote.component';
import { ClockComponent } from './widget/clock/clock.component';
import { DatePipe } from '@angular/common';
import { CalculatorComponent } from './widget/calculator/calculator.component';
import { ProfilComponent } from './profil/profil.component';
import { CheckListComponent } from './widget/check-list/check-list.component';
import { RepertoireComponent } from './widget/repertoire/repertoire.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';



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
    RegisterComponent,
    ClockComponent,
    CalculatorComponent,
    ProfilComponent,
    CheckListComponent,
    RepertoireComponent,
    AdminPanelComponent
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

  entryComponents: [DragDropComponent],

  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
