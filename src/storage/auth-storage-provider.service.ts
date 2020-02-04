import { Injectable } from "@angular/core";
import { Cacheable } from "ngx-cacheable";
import { Observable } from "rxjs";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { FirestoreStorage } from "./firestore-storage";
import { IStorageProvider } from "./i-storage-provider";
import { NoMemoryStorage } from "./no-memory-storage.service";

@Injectable({
    providedIn: "root",
})
export class AuthStorageProvider<User extends UserModel = UserModel> {
    protected config: UniFirebaseLoginConfig;

    public constructor(
        protected firestoreStorage: FirestoreStorage<User>,
        protected inMemoryStorage: NoMemoryStorage<User>,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
    }

    /**
     * Get user from cache if possible or from a storage
     */
    @Cacheable()
    public getUser(): Observable<User | null> {
        return this.getUserNonCached();
    }

    public getUserNonCached(): Observable<User | null> {
        const storageProvider = this.getProvider();

        if (storageProvider !== null) {
            return storageProvider.subscribeUser();
        }

        throw new Error("No storage provider found.");
    }

    public getProvider(): IStorageProvider<User> {
        return this.getProviderById(this.config.storage);
    }

    protected getProviderById(
        providerId: false | "firestore",
    ): IStorageProvider<User> {
        let provider;
        switch (providerId) {
            case "firestore":
                provider = this.firestoreStorage;
                break;
            case false:
                provider = this.inMemoryStorage;
                break;
        }

        if (provider !== undefined) {
            return provider;
        }

        throw new Error(`Provider ${providerId} not supported.`);
    }
}
