import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Comment} from './comment';
import {ApiService} from '../../services/api.service';

import {AmazonService} from '../../services/api.amazon';

import * as moment from 'moment/moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService, AmazonService]
})
export class HomePage {

  public input;
  public list;
  public products;

  constructor(public navCtrl: NavController, public apiService: ApiService, public amazonService: AmazonService) {
    this.products = [];
    this.list = [];
  }

  addComment() {
    this.list.push(new Comment(false, this.input));
    this.queryWitAi(this.input);
    this.list.push(new Comment(true, "Bot answers something"));
    this.input = null;
    console.log(this.list);
  }

  queryWitAi(question) {
    // var question = "Can you recommend me a gaming laptop that is under 700 euros";
    var url = '/witApi/message?v=20161217&q=' + question;
    this.apiService.get(url).subscribe(data => {
        console.log(data.json())
        this.list.push(new Comment(true, "Bot answers something" + JSON.stringify(data.json())));
      },
      err => console.error(err),
      () => console.log('Request completed'))
  }

  search() {
    console.log(moment().format('YYYY-MM-DDThh:mm:ssZ'));
    this.amazonService.getProducts("", "").subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
