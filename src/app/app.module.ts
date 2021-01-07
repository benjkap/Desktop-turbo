import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './service/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';
import { ClockComponent } from './clock/clock.component';
import { DatePipe } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ClockComponent,
    CalculatorComponent,
    FileUploadComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
