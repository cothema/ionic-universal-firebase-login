import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { TwitterAuthentication } from "..";

@NgModule({
    imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
    providers: [TwitterAuthentication],
})
export class TwitterAuthModule {}
