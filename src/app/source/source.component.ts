import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  sourceURL: string;
  title: string;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onNameKeyUp(event: any) {
    this.sourceURL = event.target.value;
  }

  addSrc() {
    const body = {
      sourceURL: this.sourceURL,
      title: 'title',
      description: 'description',
      link: 'link',
      pubDate: 'pubDate',
      };
    this.httpClient.post('http://localhost:8080/addSource', body).subscribe();
  }

}
