import { UserModel } from "./user-model";

/**
 * Firestore structure is same as user model structure, so this is an alias only
 */
export class StorageUserModel extends UserModel {
    public constructor(init?: Partial<StorageUserModel>) {
        super();
        Object.assign(this, init);
    }
}
