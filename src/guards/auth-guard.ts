import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    NavigationExtras,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { BaseAuthService } from "../services/base-auth-service";
import { IGuard } from "./i-guard";

@Injectable({
    providedIn: "root",
})
export class AuthGuard<User extends UserModel = UserModel>
    implements CanActivate, CanActivateChild, IGuard<User> {
    protected config: UniFirebaseLoginConfig;

    public constructor(
        protected auth: BaseAuthService<User>,
        protected route: ActivatedRoute,
        protected router: Router,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return new Observable(subscriber => {
            this.auth.userInitialized$.subscribe(initialized => {
                if (initialized) {
                    this.auth.user$.subscribe(user => {
                        const isLoggedIn = !!user;
                        if (!isLoggedIn) {
                            this.handleAccessDeniedRedirect(route, state).then(
                                () => {
                                    subscriber.next(false);
                                    subscriber.complete();
                                },
                            );
                        } else {
                            subscriber.next(true);
                            subscriber.complete();
                        }
                    });
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

    public async handleAccessDeniedRedirect(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<void> {
        console.log(`Access denied (AuthGuard): ${state.url}`);

        const redirectTo = this.config.signInPage;

        console.log(`Redirect: ${redirectTo}`);

        if (redirectTo) {
            let routerExtras: NavigationExtras | undefined;
            if (this.config.redirectBack) {
                routerExtras = {
                    queryParams: { redirectBack: state.url },
                };
            }
            await this.router.navigate([redirectTo], routerExtras);
        }
    }
}
