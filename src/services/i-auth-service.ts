import { Observable } from "rxjs";
import { UserModel } from "../model/user-model";

export interface IAuthService<User extends UserModel = UserModel> {
    getUser(): Observable<User | null>;

    signOut(): Promise<void>;
}
