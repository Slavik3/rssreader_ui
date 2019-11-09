import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Source} from '../source';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  newSource: Source = new Source();
  editSource: Source = new Source();
  ids: number;
  sourceItems: any;
  editItem: any;
  newSourceURL: string;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/sources/getAll').subscribe((data) => {
      this.sourceItems = data;
      this.newSource.title = 'title';//default values
      this.newSource.description = 'description';
      this.newSource.link = 'link';
      this.newSource.pubDate = 'pubDate';
    });
  }

  addSrc() {
    console.log('test');
    console.log(this.newSourceURL);
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/y;
    const match = regex.exec(this.newSource.sourceURL);
    if (match == null) {
      (document.getElementById('src') as HTMLElement).style.borderBottom = '2px solid red';
    } else {
      const body = {
      sourceURL: this.newSource.sourceURL,
      title: this.newSource.title,
      description: this.newSource.description,
      link: this.newSource.link,
      pubDate: this.newSource.pubDate,
      };
      console.log(body);
      this.httpClient.post('http://localhost:8080/sources/add', body).subscribe();
      this.sourceItems.push(body);
      this.newSource.sourceURL = '';
      // window.location.reload();
    }
}

  delete(id1: any) {
    console.log('delete');
    if (confirm('Are you sure you want to delete these source?')) {
      this.httpClient.delete(`http://localhost:8080/sources/${id1}`).subscribe();
      //window.location.reload();
      this.fetchData();
    }

  }

  open(editItem: any) {
    console.log('open');
    this.editSource.sourceURL = editItem.sourceURL;
    this.editSource.title = editItem.title;
    this.editSource.description = editItem.description;
    this.editSource.link = editItem.link;
    this.editSource.pubDate = editItem.pubDate;
  }

  save(ob: any) {
    console.log('save');
    const body = {
      id: ob.id,
      sourceURL: this.editSource.sourceURL,
      title: this.editSource.title,
      description: this.editSource.description,
      link: this.editSource.link,
      hostname: ob.hostname,
      pubDate: this.editSource.pubDate,
    }
    console.log(body);
    this.httpClient.put(`http://localhost:8080/sources/${this.ids}`, body).subscribe();
    ob.sourceURL = this.editSource.sourceURL;
    ob.title = this.editSource.title;
    ob.description = this.editSource.description;
    ob.link = this.editSource.link;
    ob.pubDate = this.editSource.pubDate;
    //window.location.reload();

}
  fetchData() {
    this.httpClient.get('http://localhost:8080/sources/getAll').subscribe((data) => {
      this.sourceItems = data;
    });
  }


}
