import { User as FirebaseUser } from "firebase";
import { Observable } from "rxjs";

export interface IStorageProvider<User> {
    /**
     * Fetch user profile data and subscribe user changes.
     */
    subscribeUser(): Observable<User | null>;

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
}
