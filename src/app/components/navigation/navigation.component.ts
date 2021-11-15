import {Component, OnInit} from '@angular/core';
import {AuthBluService} from '../../logic/services';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum, LocalUserSettingsEnum, ThemeEnum} from '../../logic/enums';
import {ThemeBluService} from '../../logic/services/blu/theme-blu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  readonly languages = [
    {
      code: String(LanguageEnum.ENGLISH),
      label: 'LANGUAGE.' + String(LanguageEnum.ENGLISH).toUpperCase()
    },
    {
      code: String(LanguageEnum.DEUTSCH),
      label: 'LANGUAGE.' + String(LanguageEnum.DEUTSCH).toUpperCase()
    },
    {
      code: String(LanguageEnum.ITALIAN),
      label: 'LANGUAGE.' + String(LanguageEnum.ITALIAN).toUpperCase()
    },
    {
      code: String(LanguageEnum.FRENCH),
      label: 'LANGUAGE.' + String(LanguageEnum.FRENCH).toUpperCase()
    }
  ];
  selectedLanguage;

  readonly themes = [
    {
      code: String(ThemeEnum.LIGHT),
      label: 'THEME.' + String(ThemeEnum.LIGHT).toUpperCase().replace('-', '_')
    },
    {
      code: String(ThemeEnum.DARK),
      label: 'THEME.' + String(ThemeEnum.DARK).toUpperCase().replace('-', '_')
    }
  ];
  selectedTheme;

  constructor(
    private _authBluService: AuthBluService,
    private _translateService: TranslateService,
    private _themeBluService: ThemeBluService
  ) {
  }

  ngOnInit(): void {
    this.selectedLanguage = {
      code: this._translateService.getDefaultLang(),
      label: 'LANGUAGE.' + this._translateService.getDefaultLang().toUpperCase()
    };

    this.selectedTheme = {
      code: this._themeBluService.getSelectedTheme(),
      label: 'THEME.' + this._themeBluService.getSelectedTheme().toUpperCase().replace('-', '_')
    };
  }

  public languageChanged(): void {
    localStorage.setItem(LocalUserSettingsEnum.PREFERRED_LANGUAGE, this.selectedLanguage.code);
    this._translateService.setDefaultLang(this.selectedLanguage.code);
  }

  public themeChanged(): void {
    localStorage.setItem(LocalUserSettingsEnum.PREFERRED_THEME, this.selectedTheme.code);
    this._themeBluService.switchTheme(this.selectedTheme.code);
  }

  public isLoggedIn(): boolean {
    return this._authBluService.isLoggedIn();
  }

  public logOut(): void {
    this._authBluService.logOut();
  }
}
