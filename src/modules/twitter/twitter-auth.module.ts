import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { TwitterAuth } from "./twitter-auth";

@NgModule({
  imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
  providers: [TwitterAuth],
})
export class TwitterAuthModule {}
