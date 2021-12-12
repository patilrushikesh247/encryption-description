import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as forge from 'node-forge';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    userName: any = "";
    ACNumber: any = "";
    btnClicked: boolean = false;
    loginSuccess: boolean;
    show :any ="";
    

    publicKey: string = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
    mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
    SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
    /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
    U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
    5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
    eQIDAQAB
    -----END PUBLIC KEY-----`;
    constructor(private _httpClient: HttpClient) { }

    login() {
        var rsa = forge.pki.publicKeyFromPem(this.publicKey);
        var encryptedPassword = window.btoa(rsa.encrypt(this.ACNumber));
        // var encryptedUsername = window.btoa(rsa.encrypt(this.userName));
        var encryptedUsername =this.userName;
        var data = { "UserName": encryptedUsername, "Password": encryptedPassword };
        this.show=data;
        this._httpClient.post<boolean>(`http://localhost:3000/posts`, data).subscribe(res => {
            this.btnClicked = true;
            this.loginSuccess = res;
        }, err => {
            console.error(err);
        });
    }

    logout() {
        this.loginSuccess = false;
        this.btnClicked = false;
    }

}