import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ExcelModule } from '@progress/kendo-angular-grid';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, GridModule, HttpClientModule, ExcelModule, MatMenuModule, FlexLayoutModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSlideToggleModule, MatDatepickerModule, DatePickerModule, MatNativeDateModule, MatButtonModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

