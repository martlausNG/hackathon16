import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Comment } from './comment';

import { AmazonService } from '../../services/api.amazon';

import * as moment from 'moment/moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AmazonService]
})
export class HomePage {

  public input;
  public list;
  public products;

  constructor(public navCtrl: NavController, public amazonService: AmazonService) {
    this.products = [];
    this.list = [];
  }

  addComment() {
    this.list.push(new Comment(false, this.input));
    this.list.push(new Comment(true, "Bot answers something"));
    this.input = null;
    console.log(this.list);
  }

  search(){
    moment().format
    console.log(moment().format('YYYY-MM-DDThh:mm:ssZ'));
    this.amazonService.getProducts("", "").subscribe(
      data => {
          this.products = data;
        }
    );
  }
}
