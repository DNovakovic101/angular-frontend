import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AuthBluService} from '../../../logic/services';
import {finalize, take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  private _emailPattern = '^[^ \\t\\r\\n\\f]+@[^ \\t\\r\\n\\f]+[\\.]{1}[a-zA-Z]{2,24}$';
  logInForm: FormGroup;
  isLoading = false;

  constructor(
    private _authBluService: AuthBluService,
    private _router: Router,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.logInForm = this._formBuilder.group({
      email   : [null, [Validators.required, Validators.maxLength(250), Validators.email, Validators.pattern(this._emailPattern)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(250)]]
    });
  }

  formSubmit() {
    this.isLoading = true;

    this._authBluService.logIn(this.logInForm.value)
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        () => this._router.navigate(['/dashboard']),
        ({error}) => {
          this.logInForm.get('password').reset();
          this._messageService.add({
            severity: 'error',
            summary: error.error,
            detail: error.message
          });
        }
      );
  }
}
