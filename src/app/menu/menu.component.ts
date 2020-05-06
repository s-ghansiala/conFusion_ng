import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
