import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private page = 0;
  private newss: Array<any>;
  private pages: Array<number>;
  news: News = new News();
  name: string;
  items: any;
  src: any;
  isLoading: boolean;
  htmlBodyDetail: string;
  title: string;
  constructor(private httpClient: HttpClient) { }

  setPage(i, event: any) {
    event.preventDefault();
    console.log(i)
    this.page = i;
    this.getN();
  }

  ngOnInit() {
    this.isLoading = true;
    /*this.httpClient.get(`http://localhost:8080/feeds`).subscribe((data) => {
      this.items = data;
      this.isLoading = false;
    });*/
    this.getN();

    this.httpClient.get('http://localhost:8080/feeds/srcOfNews').subscribe((data) => {
      this.src = data;
      console.log(this.src);
    });
  }

  /*onNameKeyUp(event: any) {
    this.name = event.target.value;
  }*/
  onChange(src) {
    this.name = src;
    return this.httpClient.get(`http://localhost:8080/feeds?source=${this.name}&page=${this.page}`).subscribe
    (
      date => {
        //console.log(date);
        this.items = date['content'];
        this.pages = new Array(date['totalPages']);
        this.isLoading = false;
      },
      (error => {
        console.log(error.error.message);
      })
    );
  }

  /*getNewsBySrc() {
    this.httpClient.get(`http://localhost:8080/feeds?source=${this.name}`).subscribe((data) => {
      this.items = data;
    });
  }*/

  upload() {
    this.isLoading = true;
    this.httpClient.post('http://localhost:8080/feeds/upload', '').subscribe(() => {
      this.isLoading = false;
    });
  }
  uploadBySrc() {
    this.isLoading = true;
    this.httpClient.post(`http://localhost:8080/feeds/upload?source=${this.name}`, '').subscribe(() => {
      this.isLoading = false;
    });
  }

  open(newsItem: any) {
    console.log('open new');
    console.log(newsItem);
    console.log(newsItem.id);
    console.log(newsItem.html_body_detail);
    this.htmlBodyDetail = newsItem.html_body_detail;
    this.title = newsItem.title;
    this.httpClient.get(`http://localhost:8080/feeds/openArticleFromDB/${newsItem.id}`, {responseType: 'text'}).subscribe();
  }

  savePDF(newsItem: any) {
    console.log('savePDF');
    this.httpClient.get(`http://localhost:8080/feeds/savePDF/${newsItem.id}`, {responseType: 'arraybuffer'}).subscribe((response: any) => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      let name = (newsItem.id);
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      if (name + '.pdf') {
        downloadLink.setAttribute('download', name + '.pdf');
      }
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  getN() {
    return this.httpClient.get('http://localhost:8080' + '/feeds?page=' + this.page).subscribe(
      date => {
        //console.log(date);
        this.items = date['content'];
        this.pages = new Array(date['totalPages']);
        this.isLoading = false;
      },
      (error => {
        console.log(error.error.message);
      })
    );
  }


}
