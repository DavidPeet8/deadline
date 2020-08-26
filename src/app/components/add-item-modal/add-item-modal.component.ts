import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../../services/todo-data.service';
import { TodoItem } from '../../models/TodoItem';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.sass']
})
export class AddItemModalComponent implements OnInit, AfterViewInit {
	item: TodoItem = 
  {
    title: '',
    description: '',
    priority: null
  }
  @ViewChild('title') title: ElementRef;

  constructor(private router: Router, private dataService: TodoDataService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void 
  {
    this.focusTitle();
  }

  closeModal() 
  {
  	this.router.navigate(['']); // Navigate back
  }

  focusTitle()
  {
    this.title.nativeElement.focus();
  }

  stopPropagation(event) 
  {
  	// Prevent event from bubbling
  	event.stopPropagation();
  }

  submitForm(event): void 
  {
    event.preventDefault();
    this._submitForm();
  }

  private _submitForm(): void 
  {
    if (this.item.title == '') return;

    this.item.priority = this.dataService.getNumItems() + 1;
    this.dataService.addItem(this.item);
    this.closeModal();
  }

  onShiftEnter(event):void 
  {
    this._submitForm();
  }

}
