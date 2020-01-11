import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { GithubAuth } from "./github-auth";

@NgModule({
    imports: [AngularFirestoreModule, IonicModule],
    providers: [GithubAuth],
})
export class GithubAuthModule {}
