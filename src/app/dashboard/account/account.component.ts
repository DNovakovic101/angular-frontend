import { AccountDetailsDto, DashboardService } from '../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [MessageService]
})
export class AccountComponent implements OnInit {
  showProgressSpinner: boolean;
  hasChanges: boolean;
  
  accountForm: FormGroup;

  existingAccountData: AccountDetailsDto

  constructor(private messageService: MessageService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.initForm();
    this.loadExistingData();
  }

  private initForm(): void {
    this.accountForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required, Validators.min(1), Validators.max(250)]),
      'lastname': new FormControl('', [Validators.required, Validators.min(1), Validators.max(250)]),
      'street': new FormControl('', [Validators.required, Validators.min(1), Validators.max(250)]),
      'code_postale': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
      'city': new FormControl('', [Validators.required, Validators.min(1), Validators.max(250)]),
    });
  }

  private async loadExistingData(): Promise<void> {
    this.showProgressSpinner = true;

    try {
      this.existingAccountData = await this.dashboardService.loadAccountDetails();
      if (this.existingAccountData?.id > 0) {
        this.accountForm.get('firstname').setValue(this.existingAccountData.firstname);
        this.accountForm.get('lastname').setValue(this.existingAccountData.lastname);
        this.accountForm.get('street').setValue(this.existingAccountData.street);
        this.accountForm.get('code_postale').setValue(this.existingAccountData.codePostale);
        this.accountForm.get('city').setValue(this.existingAccountData.city);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Kein Accountdaten!',
          sticky: true
        });
      }
    } catch (err) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Fehler beim laden der Accountdaten!',
          sticky: true
        });
      }, 100);
    } finally {
      this.showProgressSpinner = false;
    }
  }

  onSubmit() {
    const data: AccountDetailsDto = {
      firstname: this.accountForm.value.firstname,
      lastname: this.accountForm.value.lastname,
      street: this.accountForm.value.street,
      codePostale: Number(this.accountForm.value.code_postale),
      city: this.accountForm.value.city,
    };

    this.dashboardService.saveAccountDetails(data).subscribe(res => {
      this.messageService.clear();
      this.messageService.add({
        severity: 'success',
        summary: 'Gespeichert',
        detail: 'Daten gespeichert!'
      });

      //this.accountForm.controls['password'].reset();
    }, err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Daten wurden nicht gespeichert',
        detail: 'Zugangsdaten fehlerhaft!'
      });
    });
  }
}
