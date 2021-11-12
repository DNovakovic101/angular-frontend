import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  userData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  async formSubmit(form: NgForm) {
    try {
      await this.authService.login(form.value);
      form.reset();
      this.router.navigate(['/dashboard']);
    } catch (err) {
      form.controls['password'].reset();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Login failed!'
      });
    }
  }

}
