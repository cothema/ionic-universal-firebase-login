import * as firebase from "firebase";
import { StorageUserModel } from "../model/storage-user-model";
import { UserModel } from "../model/user-model";
import { IAuthProviderOptions } from "./i-auth-provider-options";

export interface IUniFirebaseLoginConfig<
    User extends UserModel = UserModel,
    StorageUser extends StorageUserModel = StorageUserModel
> {
    afterSignInPage: string | false;
    signInPage: string | false;
    storage: false | "firestore"; // TODO: implement localStorage
    storageUserTable: string | null;
    providers: IAuthProviderOptions;
    userFactoryFunc: () => User;
    storageUserFactoryFunc: (data: Partial<StorageUser>) => StorageUser;
    mapUserToStorageFunc: (user: User) => Partial<StorageUser>;
    mapFirebaseUserToStorageFunc: (
        firebaseUser: firebase.User,
    ) => Partial<StorageUser>;
}
