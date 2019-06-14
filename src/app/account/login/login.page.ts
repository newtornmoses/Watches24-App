import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email: string;
password: string;

  constructor(private userservice: UserService) { }


  // Login user
   login() {
    //  console.log('login')
    this.userservice.EmailLogin(this.email, this.password)
  }

  ngOnInit() {
    // console.log('login from Init')
  }

}
