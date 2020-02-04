import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subscriber } from 'rxjs';
import { UniFirebaseLoginConfig } from '../config/uni-firebase-login-config';
import { UniFirebaseLoginConfigProvider } from '../config/uni-firebase-login-config-provider';
import { UserModel } from '../model/user-model';
import { IStorageProvider } from './i-storage-provider';

@Injectable({
    providedIn: 'root',
})
export class InMemoryStorage<User extends UserModel = UserModel>
    implements IStorageProvider<User> {
    private userData: User | null = null;
    private subscribers: Array<Subscriber<unknown>> = [];
    private config: UniFirebaseLoginConfig;

    public constructor(
        configProvider: UniFirebaseLoginConfigProvider
    ) {
        this.config = configProvider.config;
    }

    public async updateStoredDataByUser(user: User): Promise<void> {
        this.userData = user;
        this.onUserDataChanged();
    }

    public async updateStoredDataByFirebaseUser(
        storageUser: firebase.User,
    ): Promise<void> {
        if (storageUser.uid) {
            Object.assign(
                this.userData,
                this.config.storageUserFactoryFunc(storageUser),
            );
            this.onUserDataChanged();
        } else {
            throw new Error('Firebase user has no UID.');
        }
    }

    public async fetchUser(): Promise<User | null> {
        const user = firebase.auth().currentUser;
        if (user) {
            await this.updateStoredDataByFirebaseUser(user);
        }
        return this.userData;
    }

    public subscribeUser(): Observable<User | null> {
        return new Observable(subscriber => {
            this.subscribers.push(subscriber);
            this.fetchUser().then(user => {
                subscriber.next(user);
            });
        });
    }

    private onUserDataChanged() {
        for (const subscriber of this.subscribers) {
            subscriber.next(this.userData);
        }
    }
}
