import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { TodoItem } from "../models/TodoItem";
import { AuthService } from "./auth.service";

import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService 
{
	private itemsCollection: AngularFirestoreCollection<TodoItem>;
	items: Observable<TodoItem[]>;
	numItems: number = null

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
		this.itemsCollection.add(item);
	}

	deleteItem(item: TodoItem): void
	{
		let uid = this.auth.getUid();
		const itemDoc = this.afs.doc(`users/${uid}/items/${item.id}`)
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
}


