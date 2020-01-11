import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { TwitterAuth } from "./twitter-auth";

@NgModule({
    imports: [AngularFirestoreModule, IonicModule],
    providers: [TwitterAuth],
})
export class TwitterAuthModule {}
