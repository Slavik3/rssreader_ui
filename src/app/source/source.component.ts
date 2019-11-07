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

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.editItem = '';

    this.httpClient.get('http://localhost:8080/sources/getAll').subscribe((data) => {
      this.sourceItems = data;
      /*this.title = 'title';
      this.description = 'description';
      this.link = 'link';
      this.pubDate = 'pubDate';*/
    });
  }



  addSrc() {
    console.log('test');

    console.log(this.newSourceURL);
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/y;
    const match = regex.exec(this.newSourceURL);
    if (match == null) {
      console.log('ttt');
      (document.getElementById('src') as HTMLElement).style.borderBottom = '2px solid red';
    } else {
      const body = {
      sourceURL: this.newSourceURL,
      title: document.getElementById('newTitle').value,
      description: document.getElementById('newDescription').value,
      link: document.getElementById('newLink').value,
      pubDate: document.getElementById('newPubDate').value,
      };
      console.log(body);
      this.httpClient.post('http://localhost:8080/sources/add', body).subscribe();
      this.newSourceURL = '';
      this.sourceItems.push(body);
      // window.location.reload();
    }
}

  delete(id1: any) {
    console.log('delete');
    if (confirm('Are you sure you want to delete these source?')) {
      this.httpClient.delete(`http://localhost:8080/sources/${id1}`).subscribe();
      window.location.reload();
    }
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
      sourceURL: document.getElementById('modifiedSourceURL').value,/*this.sourceURL,*/
      title: document.getElementById('title').value,/*this.title,*/
      description: document.getElementById('description').value,/*this.description,*/
      link: document.getElementById('link').value,/*this.link,*/
      hostname: ob.hostname,
      pubDate: document.getElementById('pubDate').value,/*this.pubDate,*/
    }
    console.log(body);
    this.httpClient.put(`http://localhost:8080/sources/${this.ids}`, body).subscribe();
    
    //window.location.reload();
}



}
