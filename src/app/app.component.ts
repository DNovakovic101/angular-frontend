import {Component, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AuthBluService} from './logic/services';
import {Title} from '@angular/platform-browser';
import {LanguageEnum, LocalUserSettingsEnum, ThemeEnum} from './logic/enums';
import {take} from 'rxjs/operators';
import {ThemeBluService} from './logic/services/blu/theme-blu.service';
import {fadeInAnimation} from './shared/animations/fade-in.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation]
})
export class AppComponent implements OnInit {

  private _validLanguages = [
    String(LanguageEnum.ENGLISH),
    String(LanguageEnum.DEUTSCH),
    String(LanguageEnum.FRENCH),
    String(LanguageEnum.ITALIAN)
  ];

  private _validThemes = [
    String(ThemeEnum.LIGHT),
    String(ThemeEnum.DARK)
  ];

  constructor(
    private _translateService: TranslateService,
    private _themeBluService: ThemeBluService,
    private _authBluService: AuthBluService,
    private _titleService: Title
  ) {
  }

  ngOnInit(): void {
    const localStoragePreferredLanguage = localStorage.getItem(LocalUserSettingsEnum.PREFERRED_LANGUAGE);
    const localStoragePreferredTheme = localStorage.getItem(LocalUserSettingsEnum.PREFERRED_THEME);

    if (
      localStoragePreferredLanguage === null ||
      localStoragePreferredLanguage === undefined ||
      !this._validLanguages.includes(localStoragePreferredLanguage)
    ) {
      localStorage.setItem(LocalUserSettingsEnum.PREFERRED_LANGUAGE, LanguageEnum.ENGLISH);
    }

    if (
      localStoragePreferredTheme === null ||
      localStoragePreferredTheme === undefined ||
      !this._validThemes.includes(localStoragePreferredTheme)
    ) {
      localStorage.setItem(LocalUserSettingsEnum.PREFERRED_THEME, ThemeEnum.LIGHT);
    }


    this._translateService.setDefaultLang(localStorage.getItem(LocalUserSettingsEnum.PREFERRED_LANGUAGE));
    this._themeBluService.switchTheme(localStorage.getItem(LocalUserSettingsEnum.PREFERRED_THEME));

    this._translateService.onDefaultLangChange
      .pipe(
        take(1)
      )
      .subscribe((event: LangChangeEvent) => {
        this._titleService.setTitle(event.translations?.GENERAL?.SITE_NAME);
      });

    this._authBluService.autoLogIn();
  }
}
