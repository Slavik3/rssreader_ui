import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation';
@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  ids: number;
  sourceURL: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  sourceItems: any;
  editItem: any;

  newSourceURL: string;
  newTitle = 'title';
  newDescription: 'description';
  newLink: 'link';
  newPubDate: 'pubDate';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.editItem = '';

    this.httpClient.get('http://localhost:8080/sources/getAll').subscribe((data) => {
      this.sourceItems = data;
      this.title = 'title';
      this.description = 'description';
      this.link = 'link';
      this.pubDate = 'pubDate';
    });
  }



  addSrc() {
    console.log('test');
    const body = {
      sourceURL: this.newSourceURL,
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
    //if (confirm('Are you sure you want to delete these source?')) {
      this.httpClient.delete(`http://localhost:8080/sources/${id1}`).subscribe();
      window.location.reload();
    //}
  }

  open(editItem: any) {
    console.log('open');
    console.log(editItem);
    this.editItem = editItem;
  }

  save(ob: any) {
    console.log('save');


    const body = {
      id: ob.id,
      sourceURL: this.sourceURL,
      title: this.title,
      description: this.description,
      link: this.link,
      hostname: ob.hostname,
      pubDate: this.pubDate
    }
    console.log(body);
    this.httpClient.put(`http://localhost:8080/sources/${this.ids}`, body).subscribe();
    window.location.reload();
}



}
