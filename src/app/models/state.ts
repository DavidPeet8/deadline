import { TodoItem } from './TodoItem';

export class State 
{
	itemState: TodoItem;
	action: number; // 0 = addItem, 1 = delete, 2 = edit item

	constructor(item: TodoItem, action: number)
	{
		this.itemState = item;
		this.action = action
	}
}

