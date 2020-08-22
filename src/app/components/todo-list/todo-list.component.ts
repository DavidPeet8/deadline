import { Component, OnInit } from '@angular/core';
import { TodoDataService } from "../../services/todo-data.service";
import { TodoItem } from "../../models/TodoItem";

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
}
