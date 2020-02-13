import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SourceComponent } from './source/source.component';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { JwPaginationComponent } from 'jw-angular-pagination';

const appRoutes: Routes = [
  {path: 'source', component: SourceComponent},
  {path: 'news', component: NewsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    NewsComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
