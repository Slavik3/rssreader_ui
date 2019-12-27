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
  private pages: Array<number>;
  news: News = new News();
  name: string;
  items: any;
  src: any;
  isLoading: boolean;
  htmlBodyDetail: string;
  title: string;
  sortTableByPublicationDatee = 'ASC';

  constructor(private httpClient: HttpClient) { }

  setPage(i, event: any) {
    event.preventDefault();
    console.log(i)
    this.page = i;
    this.onChange();
  }

  ngOnInit() {
    this.isLoading = true;
    this.news.dateTo = new Date().toISOString().split('T')[0];
    this.getNews();

    this.httpClient.get('http://localhost:8080/feeds/srcOfNews').subscribe((data) => {
      this.src = data;
      console.log(this.src);
    });
  }

  /*onNameKeyUp(event: any) {
    this.name = event.target.value;
  }*/
  onChange() {
    console.log('title--> ')
    console.log(this.news.title)
    return this.httpClient.get
    (`http://localhost:8080/feeds?source=${this.news.source}&title=${this.news.title}&dateFrom=${this.news.dateFrom}&dateTo=${this.news.dateTo}&sortTableByPublicationDate=${this.sortTableByPublicationDatee}&page=${this.page}`)
      .subscribe (
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

  getNews() {
    return this.httpClient.get
    (`http://localhost:8080/feeds/all?sortTableByPublicationDate=${this.sortTableByPublicationDatee}
    &dateFrom=${this.news.dateFrom}&dateTo=${this.news.dateTo}&source=${this.name}&title=${this.news.title}&page=${this.page}`).subscribe(
      date => {
        this.items = date['content'];
        this.pages = new Array(date['totalPages']);
        this.isLoading = false;
      },
      (error => {
        console.log(error.error.message);
      })
    );
  }


  /*filterByTitle() {
    return this.httpClient.get(`http://localhost:8080/feeds?page=${this.page}&title=${this.news.title}`).subscribe(
      date => {
        this.items = date['content'];
        this.pages = new Array(date['totalPages']);
        this.isLoading = false;
      },
      (error => {
        console.log(error.error.message);
      })
    );
  }*/

  sortTableByPublicationDate() {
    return this.httpClient.get(`http://localhost:8080/feeds/sort?sortTableByPublicationDate=${this.sortTableByPublicationDatee}&page=${this.page}`).subscribe(
      date => {
        this.items = date['content'];
        this.pages = new Array(date['totalPages']);
        this.isLoading = false;
        if (this.sortTableByPublicationDatee === 'ASC') {
          this.sortTableByPublicationDatee = 'DESC';
        } else {
          this.sortTableByPublicationDatee = 'ASC';
        }
        console.log(this.sortTableByPublicationDatee);
      },
      (error => {
        console.log(error.error.message);
      })
    );
  }


  /*selectDateRange() {
    console.log(this.dateFrom);
    return this.httpClient.get(
      `http://localhost:8080/feeds?sortTableByPublicationDate=${this.sortTableByPublicationDatee}
      &dateFrom=${this.news.dateFrom}&dateTo=${this.news.dateTo}&page=${this.page}`).subscribe(
      date => {
        this.items = date['content'];
        this.pages = new Array(date['totalPages']);
        this.isLoading = false;
      },
      (error => {
        console.log(error.error.message);
      })
    );
  }*/

}
