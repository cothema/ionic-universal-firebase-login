import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { BaseAuthService } from "../services/base-auth-service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard<User extends UserModel = UserModel>
    implements CanActivate, CanActivateChild {
    protected config: UniFirebaseLoginConfig;

    public constructor(
        protected auth: BaseAuthService<User>,
        protected router: Router,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return new Observable(subscriber => {
            this.auth.userInitialized$.subscribe((initialized: boolean) => {
                if (initialized) {
                    this.auth.user$.pipe(
                        take(1),
                        map(user => !!user), // Map to boolean
                        tap(loggedIn => {
                            if (!loggedIn) {
                                // Access denied
                                const redirectTo = this.config.signInPage;
                                console.log(
                                    `Insufficient permissions, redirecting to: ${redirectTo}`,
                                );
                                this.router.navigate([redirectTo]);
                                subscriber.next(false);
                            } else {
                                subscriber.next(true);
                            }
                            subscriber.complete();
                        }),
                    );
                }
            });
        });
    }

    public canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.canActivate(next, state);
    }
}
