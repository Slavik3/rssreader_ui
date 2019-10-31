import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  id: any;
  sourceURL: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  sourceItems: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/sources/getAll').subscribe((data) => {
      this.sourceItems = data;
      this.title = 'title';
      this.description = 'description';
      this.link = 'link';
      this.pubDate = 'pubDate';
    });
  }

  onNameKeyUp(event: any) {
    this.sourceURL = event.target.value;
  }

  addSrc() {
    console.log('test');
    const body = {
      sourceURL: this.sourceURL,
      title: this.title,
      description: this.description,
      link: this.link,
      pub_date: this.pubDate,
      };
    this.httpClient.post('http://localhost:8080/sources/add', body).subscribe();

    window.location.reload();
  }


  delete(id1: any) {
    console.log('delete');
    if (confirm('Are you sure you want to delete these source?')) {
      this.httpClient.delete(`http://localhost:8080/sources/${id1}`).subscribe();
      window.location.reload();
    }


  }



}
