import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Facebook } from "@ionic-native/facebook/ngx";
import { IonicModule } from "@ionic/angular";
import { FacebookAuth } from "./facebook-auth";

@NgModule({
    imports: [AngularFirestoreModule, IonicModule],
    providers: [FacebookAuth, Facebook],
})
export class FacebookAuthModule {}
