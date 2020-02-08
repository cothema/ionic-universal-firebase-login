import { AngularFireAuth } from "@angular/fire/auth";
import { User as FirebaseUser } from "firebase";
import { Observable } from "rxjs";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { IStorageProvider } from "./i-storage-provider";

export abstract class AbstractStorage<User extends UserModel = UserModel>
  implements IStorageProvider<User> {
  protected config: UniFirebaseLoginConfig;

  protected constructor(
    protected angularFireAuth: AngularFireAuth,
    configProvider: UniFirebaseLoginConfigProvider,
  ) {
    this.config = configProvider.config;
  }

  public abstract async updateStoredDataByUser(user: User): Promise<void>;

  public abstract async updateStoredDataByFirebaseUser(
    firebaseUser: FirebaseUser,
  ): Promise<void>;

  public abstract subscribeUserDataFromStorageByFirebaseUser(
    user: FirebaseUser,
  ): Observable<User | null>;

  /**
   * Override this method if you want to use custom model class
   */
  protected getNewUser(): User {
    return this.config.userFactoryFunc() as User;
  }
}
