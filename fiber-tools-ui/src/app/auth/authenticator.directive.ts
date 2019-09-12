import { Directive, ElementRef } from '@angular/core';
import { auth } from "firebase";
import { auth as authUI } from 'firebaseui';


@Directive({
  selector: '[appAuthenticator]'
})
export class AuthenticatorDirective {

  constructor(private el: ElementRef) {
    let authenticator = new authUI.AuthUI(auth(), 'fiber-tools');
    authenticator.start(this.el.nativeElement, {
      signInOptions: [
        auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/'
    });
  }



}
