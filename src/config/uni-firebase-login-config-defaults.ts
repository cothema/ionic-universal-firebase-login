import { User as FirebaseUser } from "firebase";
import { UserModel } from "../model/user-model";
import { IAuthProviderOptions } from "../services/i-auth-provider-options";
import { IUniFirebaseLoginConfig } from "../services/i-uni-firebase-login-config";

export class UniFirebaseLoginConfigDefaults<User extends UserModel = UserModel>
    implements IUniFirebaseLoginConfig<User> {
    public afterSignInPage = "/";
    public signInPage = "/sign-in";
    public storage: false | "firestore" = false;
    public storageUserTable = "users";
    public providers: IAuthProviderOptions = {};
    public userFactoryFunc: () => User = () => new UserModel() as User;
    public mapFirebaseUserToStorageFunc: (
        firebaseUser: FirebaseUser,
    ) => User = (firebaseUser: FirebaseUser) => {
        return new UserModel({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            phoneNumber: firebaseUser.phoneNumber,
            photoURL: firebaseUser.photoURL,
            uid: firebaseUser.uid,
        }) as User;
    };
}
