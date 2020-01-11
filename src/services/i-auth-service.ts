import { Observable } from "rxjs";
import { UserModel } from "../model/user-model";

export interface IAuthService<User extends UserModel = UserModel> {
    user$: Observable<UserModel | null>;

    getUser(): Observable<User | null>;

    signInViaGoogle(): Promise<any>;

    signInViaFacebook(): Promise<any>;

    updateDbDataByUser(user: User): Promise<void>;

    signOut(): Promise<void>;
}
