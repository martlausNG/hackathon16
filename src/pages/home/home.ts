import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Comment} from './comment';
import {ApiService} from '../../services/api.service';

import {AmazonService} from '../../services/api.amazon';

import * as moment from 'moment/moment';
import {AmazonRequest} from "./AmazonRequest";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService, AmazonService]
})
export class HomePage {

  public input;
  public list;
  public products;
  amazonRequest;


  constructor(public navCtrl: NavController, public apiService: ApiService, public amazonService: AmazonService) {
    this.products = [];
    this.list = [];

    this.amazonRequest = new AmazonRequest(null, null, null, null, null, null);

  }

  addComment() {
    this.list.push(new Comment(false, this.input, null));
    this.queryWitAi(this.input);
    this.input = null;
  }

  queryWitAi(question) {
    let url = '/witApi/message?v=20161217&q=' + question;
    this.apiService.get(url).subscribe(data => {
        console.log(data.json());

        let responseJson = data.json();
        let entities = responseJson.entities;
        if (entities.amount_of_money) this.amazonRequest.maxPrice = entities.amount_of_money[0].value;
        if (entities.intent) this.amazonRequest.intent = entities.intent[0].value;
        if (entities.product) this.amazonRequest.product = entities.product[0].value;
        if (entities.agenda_entry) this.amazonRequest.agenda = entities.agenda_entry[0].value;
        if (entities.local_search_query) this.amazonRequest.localSearchQuery = entities.local_search_query[0].value;


        console.log(this.amazonRequest);
        if (!this.amazonRequest.maxPrice) {
          this.list.push(new Comment(true, "What is your price limit?", null));

        } else if (!this.amazonRequest.intent && !this.amazonRequest.agenda) {
          this.list.push(new Comment(true, "What do you want to want to with it?", null));

        } else if (!this.amazonRequest.product && !this.amazonRequest.localSearchQuery) {
          this.list.push(new Comment(true, "What kind of a product do you want?", null));

        } else {
          this.list.push(new Comment(true, "You should buy \n", "https://www.amazon.co.uk/s/ref=sr_nr_p_36_4?fst=as%3Aoff&keywords=" + this.amazonRequest.product));
        }
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
