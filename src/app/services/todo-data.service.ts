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

	constructor(private afs: AngularFirestore, private auth: AuthService ) 
	{
		let uid = this.auth.getUid()
		this.itemsCollection = this.afs.collection<TodoItem>(`users/${uid}/items`);

		this.items = this.itemsCollection.snapshotChanges().pipe(
			map(change => {
				return change.map(itemPayload => {
					const data = itemPayload.payload.doc.data() as TodoItem;
					data.id = itemPayload.payload.doc.id;
					return data;
				}); 
			})
		);
	}

	addItem(item: TodoItem)
	{
		this.itemsCollection.add(item);
	}

	updateItem(item: TodoItem) 
	{
		let uid = this.auth.getUid();
		const itemref: AngularFirestoreDocument<TodoItem> = this.afs.doc<TodoItem>(`users/${uid}/items/{item.id}`);

		const data: TodoItem = 
		{
			id: item.id,
			title: item.title,
			description: item.description
		};

		return itemref.set(data, { merge: true });

	}
}


