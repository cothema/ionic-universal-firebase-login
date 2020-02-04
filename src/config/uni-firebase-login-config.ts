import { StorageUserModel } from '../model/storage-user-model';
import { UserModel } from '../model/user-model';
import { IUniFirebaseLoginConfig } from '../services/i-uni-firebase-login-config';
import { UniFirebaseLoginConfigDefaults } from './uni-firebase-login-config-defaults';

export class UniFirebaseLoginConfig<User extends UserModel = UserModel,
    StorageUser extends StorageUserModel = StorageUserModel> extends UniFirebaseLoginConfigDefaults<User, StorageUser>
    implements IUniFirebaseLoginConfig<User, StorageUser> {
}
