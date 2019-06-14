import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email:string;
  password: string;
  firstname: string;
  lastname:string;
  constructor(private UserService: UserService) { }

 
// signup
createAccount() {
  this.UserService.doRegister(this.firstname, this.lastname,this.email, this.password)
}
  ngOnInit() {
  }

}
