import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  menuErrMess: string;
  //selectedDish: Dish;

  constructor(private dishService: DishService,
              @Inject('BaseURL') public baseURL ) { }

  ngOnInit(): void {
     //this.dishes = this.dishService.getDishes();
     this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,
       errmess => this.menuErrMess = <any>errmess);
  }
  // onSelect(dish:Dish){
  //   this.selectedDish = dish;
  // }
}
