import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { AnonymousAuth } from "./anonymous-auth";

@NgModule({
  imports: [AngularFirestoreModule, IonicModule],
  providers: [AnonymousAuth],
})
export class AnonymousAuthModule {}
