import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { IonicModule } from "@ionic/angular";
import { GoogleAuthentication } from "../providers/google-authentication";

@NgModule({
    imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
    providers: [GoogleAuthentication, GooglePlus],
})
export class GoogleAuthModule {}
