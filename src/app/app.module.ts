import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SourceComponent } from './source/source.component';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';

const appRoutes: Routes = [
  {path: 'source', component: SourceComponent},
  {path: 'news', component: NewsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
