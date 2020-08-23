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

    if (event.previousIndex < event.currentIndex) // move to lower location
    {
      let temp = this.dataItems[end].priority;
      for(let i = start+1; i <= end; i++) // shift all indicies back one
      {
        // take indicies and subtract one mod the diff
        this.dataItems[i].priority--;
        this.dataService.updateItem(this.dataItems[i]);
      }
      
      this.dataItems[start].priority = temp;
      this.dataService.updateItem(this.dataItems[start]);
    }
    else if (event.previousIndex > event.currentIndex) // Move to higher location
    {
      let temp = this.dataItems[start].priority;
      for(let i = start; i < end; i++) // iterate accross this thing and swap priorities
      {
        this.dataItems[i].priority++;
        this.dataService.updateItem(this.dataItems[i]);
      }
      
      this.dataItems[end].priority = temp;
      this.dataService.updateItem(this.dataItems[end]);
    }
    
    moveItemInArray(this.dataItems, event.previousIndex, event.currentIndex);
  }
}
