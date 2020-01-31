import { Observable } from "rxjs";
import { UserModel } from "../model/user-model";

export interface IAuthService<User extends UserModel = UserModel> {
    getUser(): Observable<User | unknown | null>;

    signOut(): Promise<void>;
}
