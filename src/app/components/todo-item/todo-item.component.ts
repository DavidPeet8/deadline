import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass'],
  animations: [
  	trigger('grow', [
  		state('noHeight', style({
  			maxHeight: '0px'
  		})),
  		state('fullHeight', style({
  			maxHeight: '1000px'
  		})),
  		transition('noHeight => fullHeight', [
  			animate('0.5s')
  		]),
  		transition('fullHeight => noHeight', [
  			animate('0.1s')
  		])
  	]),
  	trigger('titleStyle', [
  		state('plain', style({
  			marginBottom: '0px',
  			borderBottom: '0px'
  		})),
  		state('decorated', style({
  			marginBottom: '10px',
  			borderBottom: '1px solid white'
  		})),
  		transition('plain => decorated', [
  			animate('0.1s')
  		]),
  		transition('decorated => plain', [
  			animate('0.1s')
  		])
  	])
  ],
  preserveWhitespaces: true
})
export class TodoItemComponent implements OnInit 
{
	@Input() model;
	@ViewChild('showEditing') editing: ElementRef;
	isFullHeight: boolean = false;
  isEditing: boolean = false;


	constructor(private dataService: TodoDataService) { }

	ngOnInit(): void {
	}

	getTitle(): string
	{
		return this.model.title;
	}

	getBody(): string
	{
		return this.model.description;
	}

	hasBody(): boolean
	{
		return this.model.description;
	}

	showBody(): void
	{
		if (this.hasBody())
		{
			this.isFullHeight = !this.isFullHeight; // trigger the animation
		}
	}

	editItem(event): void 
  {
    this.isEditing = true;
  }

	deleteItem(): void 
	{
		this.dataService.deleteItem(this.model);
	}

  saveItem(event): void 
  {
    this.isEditing = false;
    this.dataService.updateItem(this.model);
  }

  @HostListener('document:keypress', ['$event'])
  keySaveItem(event): void 
  {
    if (this.isEditing && event.key.toLowerCase() == 's' && event.shiftKey && event.ctrlKey)
    {
      this.saveItem(null);
    }
  }

}
