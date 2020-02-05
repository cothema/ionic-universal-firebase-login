import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserModel } from "../model/user-model";

export interface IGuard<User extends UserModel = UserModel> {

    handleAccessDeniedRedirect(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<void>;

}
