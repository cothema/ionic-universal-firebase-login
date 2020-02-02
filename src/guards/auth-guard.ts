import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { map, take, tap } from "rxjs/operators";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UserModel } from "../model/user-model";
import { BaseAuthService } from "../services/base-auth-service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard<User extends UserModel = UserModel>
    implements CanActivate, CanActivateChild {
    public constructor(
        protected auth: BaseAuthService<User>,
        protected router: Router,
        protected config: UniFirebaseLoginConfig,
    ) {}

    public async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<boolean> {
        const user$ = this.auth.getUser();

        return user$
            .pipe(
                take(1),
                map(user => !!user), // Map to boolean
                tap(loggedIn => {
                    if (!loggedIn) {
                        // Access denied
                        const redirectTo = this.config.signInPage;
                        console.log(
                            `Insufficient permissions, redirecting to: ${redirectTo}`,
                        );
                        return this.router.navigate([redirectTo]);
                    }
                }),
            )
            .toPromise();
    }

    public canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<boolean> {
        return this.canActivate(next, state);
    }
}
