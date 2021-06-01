import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExcelModule } from '@progress/kendo-angular-grid';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, GridModule, HttpClientModule, ExcelModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

