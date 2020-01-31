import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export interface IStorageProvider<User> {
    /**
     * Fetch user profile data.
     */
    fetchUser(): Promise<unknown | User | null>;

    /**
     * Fetch user profile data and subscribe user changes.
     */
    subscribeUser(): Observable<unknown | User | null>;

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
    updateStoredDataByFirebaseUser(firebaseUser: firebase.User): Promise<void>;
}
