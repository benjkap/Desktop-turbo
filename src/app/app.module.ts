import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './service/auth/auth.service';
import {RegisterComponent} from './register/register.component';
import { ClockComponent } from './widget/clock/clock.component';
import { DatePipe } from '@angular/common';
import { CalculatorComponent } from './widget/calculator/calculator.component';
import { ProfilComponent } from './profil/profil.component';
import { CheckListComponent } from './check-list/check-list.component';
import { RepertoireComponent } from './repertoire/repertoire.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ClockComponent,
    CalculatorComponent
    ProfilComponent,
    CheckListComponent,
    RepertoireComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
