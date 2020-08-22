import { Component, OnInit } from '@angular/core';
import { TodoDataService } from "../../services/todo-data.service";
import { TodoItem } from "../../models/TodoItem";
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {
	dataItems: TodoItem[];

  constructor(private dataService: TodoDataService) { }

  ngOnInit(): void {
    this.dataService.items.subscribe((items: TodoItem[]) => {
      this.dataItems = items;
    });
  }

  hasData(): boolean
  {
    if (this.dataItems)
    {
      return this.dataItems.length > 0;
    }
    return false;
  }

  onDrop(event: CdkDragDrop<TodoItem[]>): void
  {
    let start = Math.min(event.previousIndex, event.currentIndex);
    let end = Math.max(event.previousIndex, event.currentIndex);
    for(let i = start; i <= end; i++ )// iterate accross this thing and swap priorities
    {
      // This actually requires a bit of math
    }
    moveItemInArray(this.dataItems, event.previousIndex, event.currentIndex);
  }
}
