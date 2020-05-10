import { Component, OnInit, Input, ViewChild, Inject  } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

    autoTicks = false;
    disabled = false;
    invert = false;
    max = 5;
    min = 0;
    showTicks = true;
    step = 1;
    thumbLabel = true;
    value = 5;
    vertical = false;
    tickInterval = 1;


    dish : Dish;
    //dishcopy: Dish;
	  dishIds : string[];
	  prev : string;
    next : string;
    dishDetailErrMess: string;

    commentForm: FormGroup;
    comment: Comment;

    visibility = 'shown';

    @ViewChild('cform') commentFormDirective;

    formErrors = {
        'author': '',
        'rating': 5,
        'comment': ''
    };

    validationMessages = {
        'author': {
            'required' : 'Author name is required.',
            'minlength' : 'Author name must be at least 2 characters long'
        },
        'comment': {
            'required' : 'Comment is required.'
        }
    };
  	constructor(private dishService: DishService,
  		private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
      @Inject('BaseURL') public baseURL)
      {
        this.createForm();
      }

	ngOnInit() {
		this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
      errmess => this.dishDetailErrMess = <any>errmess);

		this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id']);}))
		.subscribe(dish => { this.dish = dish; /*this.dishcopy = dish;*/ this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.dishDetailErrMess = <any>errmess);
	}

    getSliderTickInterval(): number | 'auto' {
        if (this.showTicks) {
          return this.autoTicks ? 'auto' : this.tickInterval;
        }

        return 0;
    }

    createForm(): void {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]],
            rating: 5,
            comment: ['', Validators.required ]
        });

        this.commentForm.valueChanges
            .subscribe(data => this.onValueChanged(data),
              errmess => this.dishDetailErrMess = <any>errmess);

        this.onValueChanged(); // reset form validation messages
    }

    onValueChanged(data?:any){
        if(!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors){
            if(this.formErrors.hasOwnProperty(field)){
                //clear previous error messages (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if(control && control.dirty && !control.valid){
                    const messages = this.validationMessages[field];
                    for( const key in control.errors){
                        if (control.errors.hasOwnProperty(key)){
                            this.formErrors[field] += messages[key];
                        }
                    }
                }
            }
        }
    }

    onSubmit() {
        this.comment = this.commentForm.value;
        var date = new Date();
        var dateString = date.toISOString();
        this.comment.date = dateString;
        this.dish.comments.push(this.comment);
        //this.dishcopy.comments.push(this.comment);
        this.dishService.putDish(this.dish)
          .subscribe(dish => {
            this.dish = dish; /*this.dishcopy = dish*/;
          },
          errmess => { this.dish = null; /*this.dishcopy = null;*/ this.dishDetailErrMess = <any>errmess; });
        console.log(this.comment);
        this.commentForm.reset({
            author : '',
            rating : 5,
            comment : ''
        });
        this.commentFormDirective.resetForm();
    }

	setPrevNext(dishId: string) {
		const index = this.dishIds.indexOf(dishId);
		this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
		this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
	}

	goBack(): void{
		this.location.back();
	}
}
