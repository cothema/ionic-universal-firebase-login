import { User as FirebaseUser } from "firebase";
import { UserModel } from "../model/user-model";
import { IAuthProviderOptions } from "./i-auth-provider-options";

export interface IUniFirebaseLoginConfig<User extends UserModel = UserModel> {
    afterSignInPage: string | false;
    signInPage: string | false;
    storage: false | "firestore"; // TODO: implement localStorage
    storageUserTable: string | null;
    providers: IAuthProviderOptions;
    userFactoryFunc: () => User;
    mapFirebaseUserToStorageFunc: (firebaseUser: FirebaseUser) => Partial<User>;
}
