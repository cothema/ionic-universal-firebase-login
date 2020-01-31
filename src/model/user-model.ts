export class UserModel {
    public uid?: string | null;
    public email?: string | null;
    public photoURL?: string | null;
    public displayName?: string | null;

    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}
