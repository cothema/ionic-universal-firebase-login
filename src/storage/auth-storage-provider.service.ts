import { Injectable } from "@angular/core";
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
