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
  newSourceURL: string;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/sources/getAll').subscribe((data) => {
      this.sourceItems = data;
      this.newSource.title = 'title'; // default values
      this.newSource.description = 'description';
      this.newSource.link = 'link';
      this.newSource.pubDate = 'pubDate';
    });
  }

  addSrc() {
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
      this.httpClient.post('http://localhost:8080/sources/add', body).subscribe((data) => {
        this.sourceItems.push(data);
      });
      this.newSource.sourceURL = '';
    }
}

  delete(id: any) {
    if (confirm('Are you sure you want to delete these source?')) {
      this.httpClient.delete(`http://localhost:8080/sources/${id}`).subscribe();
      this.sourceItems.splice(this.newSource, 1);
    }

  }

  open(editSource: any) {
    console.log('open');
    console.log(editSource);
    this.editSource.id = editSource.id;
    this.editSource.sourceURL = editSource.sourceURL;
    this.editSource.title = editSource.title;
    this.editSource.description = editSource.description;
    this.editSource.link = editSource.link;
    this.editSource.pubDate = editSource.pubDate;
    this.editSource.hostname = editSource.hostname;
    this.editSource.isActive = editSource.isActive;
    editSource.sourceURL = this.editSource.sourceURL;

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
      isActive: this.editSource.isActive
    };
    console.log(body);
    this.httpClient.put(`http://localhost:8080/sources/${this.ids}`, body).subscribe();

    const targetIdx = this.sourceItems.map(item => item.id).indexOf(ob.id);
    this.sourceItems[targetIdx].sourceURL = this.editSource.sourceURL;
    this.sourceItems[targetIdx].title = this.editSource.title;
    this.sourceItems[targetIdx].description = this.editSource.description;
    this.sourceItems[targetIdx].link = this.editSource.link;
    this.sourceItems[targetIdx].pubDate = this.editSource.pubDate;
    this.sourceItems[targetIdx].isActive = this.editSource.isActive;
  }

}
