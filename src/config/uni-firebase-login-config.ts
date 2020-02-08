import { UserModel } from "../model/user-model";
import { IUniFirebaseLoginConfig } from "../services/i-uni-firebase-login-config";
import { UniFirebaseLoginConfigDefaults } from "./uni-firebase-login-config-defaults";

export class UniFirebaseLoginConfig<User extends UserModel = UserModel>
  extends UniFirebaseLoginConfigDefaults<User>
  implements IUniFirebaseLoginConfig<User> {}
