import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') public baseURL) { }

    dish: Dish;
    promotion: Promotion;
    leader: Leader;
    homeErrMess: string;

  ngOnInit(): void {
    //this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess => this.homeErrMess = <any>errmess);

    //this.promotion = this.promotionservice.getFeaturedPromotion();
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errmess => this.homeErrMess = <any>errmess);

    //this.leader = this.leaderservice.getFeatruedLeader();
    this.leaderservice.getFeatruedLeader().subscribe(leader => this.leader = leader,
      errmess => this.homeErrMess = <any>errmess);
  }
}
