import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ActivateAccountComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CodeInputModule
    ],
    providers: [
        HttpClient,
        provideHttpClient()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
