import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AmazonService {
    constructor(private http: Http) {
    }

    private amazonKey = "AKIAIXDABNERKE4TMLCA";
    private associateId = "chatbot-21";

    getProducts(use, price) {
        var url = "http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=" + this.amazonKey + "&AssociateTag=" + this.associateId + "&Operation=ItemSearch&Keywords=the%20hunger%20games&SearchIndex=PCHardware&Timestamp=[YYYY-MM-DDThh:mm:ssZ]&Signature=[Request Signature]&sort=price";

        return new Observable(observer => {
            setTimeout(() => {
                observer.next([{
                    Name: "Apple MacBook MLHE2LL/A 12-Inch Laptop with Retina Display",
                    Url: "https://www.amazon.com/Apple-MacBook-MLHE2LL-12-Inch-Display/dp/B01EIUEZ1W/",
                    PictureUrl: "https://images-na.ssl-images-amazon.com/images/I/51MYSMT-GwL._AC_US125_.jpg"
                }]);
            }, 1500);
        });
    }

    getRepos(username) {
        let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
        return repos;
    }
}