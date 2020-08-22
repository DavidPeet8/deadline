import { Injectable } from '@angular/core';
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private user$: Observable<User>;
	private uid: string;

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
	) {
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) 
				{
					this.uid = user.uid;
					return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
				} 
				else 
				{
					return of(null);
				}
			})
		);
	}

	async googleSignIn() 
	{
		const provider = new auth.GoogleAuthProvider();
		const credential = await this.afAuth.signInWithPopup(provider);
		return this.updateUserData(credential.user);
	}

	async signOut() 
	{
		await this.afAuth.signOut();
	}

	private updateUserData(user) 
	{
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

		const data = 
		{
			uid: user.uid,
			email: user.email,
			displayName: user.displayName
		};

		return userRef.set(data, { merge: true });
	}

	getUid(): string
	{
		return this.uid;
	}

	getUserObservable(): Observable<User>
	{
		return this.user$;
	}
}
