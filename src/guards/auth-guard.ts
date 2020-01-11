import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { BaseAuthService } from "../services/base-auth-service";

export class AuthGuard implements CanActivate {
    public loginPage = "/login";

    public constructor(private auth: BaseAuthService, private router: Router) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.auth.getUser().pipe(
            take(1),
            map(user => !!user), // Map to boolean
            tap(loggedIn => {
                if (!loggedIn) {
                    // Access denied
                    this.router.navigate([this.loginPage]);
                }
            }),
        );
    }
}
