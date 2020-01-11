import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Facebook } from "@ionic-native/facebook/ngx";
import { IonicModule } from "@ionic/angular";
import { FacebookAuthentication } from "../providers/facebook-authentication";

@NgModule({
    imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
    providers: [FacebookAuthentication, Facebook],
})
export class FacebookAuthModule {}
