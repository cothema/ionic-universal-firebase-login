import { UserModel } from "./user-model";

/**
 * Firestore structure is same as user model structure, so this is an alias only
 */
export class FirebaseUserModel extends UserModel {
    public constructor(init?: Partial<FirebaseUserModel>) {
        super();
        Object.assign(this, init);
    }
}
