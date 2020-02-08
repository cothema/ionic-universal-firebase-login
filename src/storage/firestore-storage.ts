import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { User as FirebaseUser } from "firebase";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { AbstractStorage } from "./abstract-storage";
import { IStorageProvider } from "./i-storage-provider";

@Injectable({
  providedIn: "root",
})
export class FirestoreStorage<User extends UserModel = UserModel>
  extends AbstractStorage<User>
  implements IStorageProvider<User> {
  public constructor(
    protected angularFirestore: AngularFirestore,
    angularFireAuth: AngularFireAuth,
    configProvider: UniFirebaseLoginConfigProvider,
  ) {
    super(angularFireAuth, configProvider);
  }

  public async updateStoredDataByUser(user: User): Promise<void> {
    if (user.uid) {
      const userRef = this.getUserRef(user.uid);

      await userRef.set(JSON.parse(JSON.stringify(user)), {
        merge: true,
      });
    } else {
      throw new Error("Firebase user has no UID.");
    }
  }

  public getUserRef(userUid: string): AngularFirestoreDocument<User> {
    if (this.config.storageUserTable === null) {
      throw new Error("userTable is not specified!");
    }

    return this.angularFirestore
      .collection(this.config.storageUserTable)
      .doc<User>(userUid);
  }

  public async updateStoredDataByFirebaseUser(
    firebaseUser: FirebaseUser,
  ): Promise<void> {
    if (firebaseUser.uid) {
      const userRef = this.getUserRef(firebaseUser.uid);

      const data = this.config.mapFirebaseUserToStorageFunc(firebaseUser);

      await userRef.set(JSON.parse(JSON.stringify(data)), {
        merge: true,
      });
    } else {
      throw new Error("Firebase user has no UID.");
    }
  }

  public subscribeUserDataFromStorageByFirebaseUser(
    user: FirebaseUser,
  ): Observable<User | null> {
    return this.getUserRef(user.uid)
      .valueChanges()
      .pipe(
        map((userFirebase: any) => {
          return Object.assign<User, any>(this.getNewUser(), userFirebase);
        }),
      ) as Observable<User>;
  }
}
