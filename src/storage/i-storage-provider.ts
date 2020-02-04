import { User as FirebaseUser } from "firebase";
import { Observable } from "rxjs";

export interface IStorageProvider<User> {
    /**
     * Store user profile data for further use.
     *
     * @param user
     */
    updateStoredDataByUser(user: User): Promise<void>;

    /**
     * Store user profile data for further use from Firebase authentication provider
     *
     * @param firebaseUser
     */
    updateStoredDataByFirebaseUser(firebaseUser: FirebaseUser): Promise<void>;

    subscribeUserDataFromStorageByFirebaseUser(
        user: FirebaseUser,
    ): Observable<User | null>;
}
