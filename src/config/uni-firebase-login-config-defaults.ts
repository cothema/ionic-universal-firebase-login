import * as firebase from "firebase";
import { StorageUserModel } from "../model/storage-user-model";
import { UserModel } from "../model/user-model";
import { IAuthProviderOptions } from "../services/i-auth-provider-options";
import { IUniFirebaseLoginConfig } from "../services/i-uni-firebase-login-config";

export class UniFirebaseLoginConfigDefaults<
    User extends UserModel = UserModel,
    StorageUser extends StorageUserModel = StorageUserModel
> implements IUniFirebaseLoginConfig<User, StorageUser> {
    public afterSignInPage = "/";
    public signInPage = "/sign-in";
    public storage: false | "firestore" = false;
    public storageUserTable = "users";
    public providers: IAuthProviderOptions = {};
    public userFactoryFunc: () => User = () => new UserModel() as User;
    public storageUserFactoryFunc: (
        data: Partial<StorageUser>,
    ) => StorageUser = (data: Partial<StorageUser>) =>
        new StorageUserModel(data) as StorageUser;
    public mapUserToStorageFunc: (user: User) => StorageUser = (
        user: UserModel,
    ) => {
        return new StorageUserModel({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
        }) as StorageUser;
    };
    public mapFirebaseUserToStorageFunc: (
        firebaseUser: firebase.User,
    ) => StorageUser = (firebaseUser: firebase.User) => {
        return new StorageUserModel({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            phoneNumber: firebaseUser.phoneNumber,
            photoURL: firebaseUser.photoURL,
            uid: firebaseUser.uid,
        }) as StorageUser;
    };
}
