import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {passwordMissmatch} from '../../../shared/validators/CustomValidators';
import {AccountType, RegisterDto} from '../../../logic/entities';
import {AuthBluService} from '../../../logic/services';
import {finalize, take} from 'rxjs/operators';
import {AccountTypeEnum} from '../../../logic/enums';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  private _emailPattern = '^[^ \\t\\r\\n\\f]+@[^ \\t\\r\\n\\f]+[\\.]{1}[a-zA-Z]{2,24}$';
  private _isDigitPattern = '^[0-9]*$';

  registrationForm: FormGroup;
  showProgressSpinner = false;

  accountTypes: AccountType[] = [
    {typeName: 'ACCOUNT_TYPE.CUSTOMER', typeValue: AccountTypeEnum.CUSTOMER},
    {typeName: 'ACCOUNT_TYPE.BODY_SHOP', typeValue: AccountTypeEnum.BODY_SHOP},
  ];

  constructor(
    private _authBluService: AuthBluService,
    private _router: Router,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      accountType    : [0, [Validators.required]],
      firstName      : [null, [Validators.required]],
      lastName       : [null, [Validators.required]],
      street         : [null, []],
      companyName    : [null, []],
      postalCode     : [null, [Validators.minLength(4), Validators.maxLength(4), Validators.pattern(this._isDigitPattern)]],
      city           : [null, [Validators.required]],
      email          : [null, [Validators.required, Validators.maxLength(250), Validators.email, Validators.pattern(this._emailPattern)]],
      password       : [null, [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
      acceptAGBs     : [false, [Validators.required, Validators.requiredTrue]],
      acceptANB      : [false, []],
    }, {
      validators: passwordMissmatch
    });
  }

  formSubmit() {
    this.showProgressSpinner = true;

    const {email, password, accountType, ...accountDetails} = this.registrationForm.value;
    const registrationData: RegisterDto = {email, password, accountType, userDetails: accountDetails};
    delete registrationData.userDetails['passwordConfirm'];

    this._authBluService.register(registrationData)
      .pipe(
        take(1),
        finalize(() => this.showProgressSpinner = false)
      )
      .subscribe(
        () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration!',
            life: 2500
          });
          this._router.navigate(['/dashboard']);
        },
        () => {
          this.registrationForm.reset();

          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Registration failed!'
          });
        }
      );
  }
}
