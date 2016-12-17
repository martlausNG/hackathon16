import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Comment } from './comment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  input;
  list;

  constructor(public navCtrl: NavController) {
    this.list = [];
  }

  addComment() {
    this.list.push(new Comment(false, this.input));
    this.list.push(new Comment(true, "Bot answers something"));
    this.input = null;
    console.log(this.list);
  }

}
