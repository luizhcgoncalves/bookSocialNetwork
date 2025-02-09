import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-activate-account',
    standalone: false,
    templateUrl: './activate-account.component.html',
    styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

    message = '';
    isOkay = true;
    submitted = false;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {

    }

    onCodeCompleted(token: string) {
        this.confirmAccount(token);
    }

    redirectLogin() {
        this.router.navigate(['login'])
    }

    private confirmAccount(token: string) {
        this.authService
            .confirm({ token })
            .subscribe({
                next: () => {
                    this.message = 'Your account has been successfully activated!.';
                    this.submitted = true;
                    this.isOkay = true;
                },
                error: (err) => {
                    console.log(err);
                    this.message = 'Your token has expired or is invalid'
                    this.submitted = true;
                    this.isOkay = false;
                }
            })
    }

}
