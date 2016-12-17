import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AmazonService } from '../../services/api.amazon';

import * as moment from 'moment/moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AmazonService]
})
export class HomePage {

  public products;

  constructor(public navCtrl: NavController, public amazonService: AmazonService) {
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
