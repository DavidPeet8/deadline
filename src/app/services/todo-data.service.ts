import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { TodoItem } from "../models/TodoItem";
import { AuthService } from "./auth.service";

import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { State } from "../models/state";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService 
{
	private itemsCollection: AngularFirestoreCollection<TodoItem>;
	items: Observable<TodoItem[]>;
	private numItems: number = null
	private prevActions: State[] = []; // Keep max size of 5, most recent at 0, least recent at 5

	constructor(private afs: AngularFirestore, private auth: AuthService ) 
	{
		let uid = this.auth.getUid()
		this.itemsCollection = this.afs.collection<TodoItem>(`users/${uid}/items`, ref => ref.orderBy('priority', 'asc'));

		this.items = this.itemsCollection.snapshotChanges().pipe(
			map(change => {
				return change.map(itemPayload => {
					const data = itemPayload.payload.doc.data() as TodoItem;
					data.id = itemPayload.payload.doc.id;
					return data;
				}); 
			})
		);
		this.items.subscribe(items => {this.numItems = items.length});
	}

	addItem(item: TodoItem): void
	{
		// this.prevActions.unshift(new State(item, 0));
		// this.checkQueue();	
		this._addItem(item);
	}

	private _addItem(item: TodoItem): void 
	{
		this.itemsCollection.add(item);
	}

	deleteItem(item: TodoItem): void
	{
		this.prevActions.unshift(new State(item, 1));
		this.checkQueue();
		this._deleteItem(item);
		
	}

	private _deleteItem(item: TodoItem) 
	{
		let uid = this.auth.getUid();
		const itemDoc = this.afs.doc(`users/${uid}/items/${item.id}`)
		console.log(item);
		console.log(itemDoc);
		itemDoc.delete();
	}

	getNumItems(): number
	{
		return this.numItems;
	}

	updateItem(item: TodoItem) 
	{
		let uid = this.auth.getUid();
		const itemref: AngularFirestoreDocument<TodoItem> = this.afs.doc<TodoItem>(`users/${uid}/items/${item.id}`);

		const data: TodoItem = 
		{
			id: item.id,
			title: item.title,
			description: item.description,
			priority: item.priority
		};

		return itemref.set(data, { merge: true });
	}

	undo(): void
	{
		if (this.prevActions.length == 0) return;
		console.log(this.prevActions);
		let prevState = this.prevActions.shift();
		console.log(this.prevActions);
		switch (prevState.action)
		{
			case 0: // Insert
				//Do Nothing, no point in deleting item, 
				break;
			case 1: // Delete
				this._addItem(prevState.itemState);
				break;
			case 2: // Edit
				// Also do nothing the docs are too trash and I dont feel like scouring the internet more
				break;
		}
	}

	private checkQueue(): void 
	{
		if (this.prevActions.length > 5)
		{
			this.prevActions = this.prevActions.slice(5);
		}
	}
}


