import { Observable } from "rxjs";
import { UserModel } from "../model/user-model";

export interface IAuthService<User extends UserModel = UserModel> {
  user: User | null;
  user$: Observable<User | null>;

  signOut(): Promise<void>;
}
