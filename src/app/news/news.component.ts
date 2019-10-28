import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  name: string;
  items: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onNameKeyUp(event: any) {
    this.name = event.target.value;
  }
  getNews() {
    this.httpClient.get('http://localhost:8080/feeds').subscribe((data) => {
      this.items = data;
    });
  }

  getNewsBySrc() {
    this.httpClient.get(`http://localhost:8080/feeds?source=${this.name}`).subscribe((data) => {
      this.items = data;
    });
  }

}
