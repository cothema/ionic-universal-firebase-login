import { Injectable } from "@angular/core";
import { Cacheable } from "ngx-cacheable";
import { from, Observable } from "rxjs";
import { UserModel } from "..";
import { UserFactory } from "../factories/user-factory";
import { FirebaseStorage } from "./firebase-storage";
import { IStorageProvider } from "./i-storage-provider";
import { IStorageProviderOptions } from "./i-storage-provider-options";
import { InMemoryStorage } from "./in-memory-storage.service";

@Injectable({
    providedIn: "root",
})
export class AuthStorageProvider<User extends UserModel = UserModel> {
    public options: IStorageProviderOptions = {
        storage: false,
        userTable: "users",
    };

    public constructor(
        public userFactory: UserFactory,
        private firebaseStorage: FirebaseStorage<User>,
        private inMemoryStorage: InMemoryStorage,
    ) {}

    /**
     * Get user from cache if possible or from a storage
     */
    @Cacheable()
    public getUser(): Observable<User | unknown | null> {
        const storageProvider = this.getProvider();

        if (storageProvider !== null) {
            return from(storageProvider.fetchUser());
        }

        throw new Error("No storage provider found.");
    }

    public getProvider() {
        return this.getProviderById(this.options.storage);
    }

    protected getProviderById(
        providerId: false | "firestore",
    ): IStorageProvider<User> {
        let provider;
        switch (providerId) {
            case "firestore":
                provider = this.firebaseStorage;
                provider.options.userTable = this.options.userTable;
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
