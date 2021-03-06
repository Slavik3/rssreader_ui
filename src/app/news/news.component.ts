import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../news';
import * as glob from '../globals';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {
  private baseAppUrl = glob.baseAppUrl;
  private page = 1;
  private pages: Array<number>;

  news: News = new News();
  name: string;
  newsItems = [];
  src: any;
  isLoading: boolean;
  error: boolean;
  htmlBodyDetail: string;
  title: string;
  sortTableByPublicationDatee = 'ASC';

  pageOfItems: Array<any>;

  items10: number[] = [];

  firstPaginationElement: number;
  lastPaginationElement: number;

  constructor(private httpClient: HttpClient) { }

  setPage(p, event:any) {
    this.isLoading = true;
    event.preventDefault();
    this.page = p;
    if (p !== 0) {
      document.getElementById("previous").classList.remove("disabled");
    }
    if (p == 0) {
      document.getElementById("previous").classList.add("disabled");
    }
    if (p == this.pages.length - 1) {
      document.getElementById("next").classList.add("disabled");
    } else {
      document.getElementById("next").classList.remove("disabled");
    }

    this.onChange();
  }

  ngOnInit() {
    this.isLoading = true;
    this.news.dateTo = new Date().toISOString().split('T')[0];
    this.getNews();

    this.httpClient.get(this.baseAppUrl + 'feeds/srcOfNews').subscribe((data) => {
      this.src = data;
    }
    );

  }

  /*onNameKeyUp(event: any) {
    this.name = event.target.value;
  }*/
  onChange() {
    return this.httpClient.get
    (this.baseAppUrl + `feeds?source=${this.news.source}&title=${this.news.title}&dateFrom=${this.news.dateFrom}&dateTo=${this.news.dateTo}&sortTableByPublicationDate=${this.sortTableByPublicationDatee}&page=${this.page}`)
      .subscribe(
        date => {
          this.newsItems = date['content'];
          this.pages = new Array(date['totalPages']);
          this.items10 = this.createRange();
          this.isLoading = false;
        },
        (error => {
          console.log(error.error.message);
      })
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    console.log('this.pageOfItems==> ');
    console.log(this.pageOfItems);
    console.log('pageOfItems==> ');
    console.log(pageOfItems);
    this.pages = pageOfItems;
  }

  changeSort() {
    if (this.sortTableByPublicationDatee === 'ASC') {
      this.sortTableByPublicationDatee = 'DESC';
    } else {
      this.sortTableByPublicationDatee = 'ASC';
    }
    return this.httpClient.get
    (this.baseAppUrl + `feeds?source=${this.news.source}&title=${this.news.title}&dateFrom=${this.news.dateFrom}&dateTo=${this.news.dateTo}&sortTableByPublicationDate=${this.sortTableByPublicationDatee}&changeSort=true&page=${this.page}`)
      .subscribe (
        date => {
          this.newsItems = date['content'];
          this.pages = new Array(date['totalPages']);
          this.isLoading = false;
        },
        (error => {
          console.log(error.error.message);
        })
      );
  }

  upload() {
    this.isLoading = true;
    this.httpClient.post(this.baseAppUrl + 'feeds/upload', '').subscribe(() => {
      this.isLoading = false;
    });
  }
  uploadBySrc() {
    this.isLoading = true;
    this.httpClient.post(this.baseAppUrl + `feeds/upload?source=${this.name}`, '').subscribe(() => {
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
    this.httpClient.get(this.baseAppUrl + `feeds/openArticleFromDB/${newsItem.id}`, {responseType: 'text'}).subscribe();
  }

  savePDF(newsItem: any) {
    console.log('savePDF');
    this.httpClient.get(this.baseAppUrl + `feeds/savePDF/${newsItem.id}`, {responseType: 'arraybuffer'}).subscribe((response: any) => {
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
    (this.baseAppUrl + `feeds/all?sortTableByPublicationDate=${this.sortTableByPublicationDatee}
    &dateFrom=${this.news.dateFrom}&dateTo=${this.news.dateTo}&source=${this.name}&title=${this.news.title}&page=${this.page}`).subscribe(
      date => {
        this.newsItems = date['content'];
        this.pages = new Array(date['totalPages']);
        for (let i = 1; i < this.pages.length, i <= 10; i++) {
          this.items10[i - 1] = i;
        }
        this.isLoading = false;
      },
      (error => {
        console.log(error.error.message);
        this.error = true;
      })
    );
  }


  createRange() {
    const items: number[] = [];
    if (this.page <= 6) {
        this.firstPaginationElement = 1;
        this.lastPaginationElement = 10;
      } else {
        this.firstPaginationElement = this.page - 5;
        if (this.page + 5 < this.pages.length) {
          this.lastPaginationElement = this.page + 5;
        } else {
          this.lastPaginationElement = this.pages.length - 1;
        }
      }
    for (this.firstPaginationElement; this.firstPaginationElement <= this.lastPaginationElement; this.firstPaginationElement++) {
      items.push(this.firstPaginationElement);
    }
    return items;
    }

}
