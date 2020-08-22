import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass']
})
export class TodoItemComponent implements OnInit 
{
	@Input() model;

	constructor() { }

	ngOnInit(): void {
	}

	getTitle(): string
	{
		return this.model.title;
	}

}
