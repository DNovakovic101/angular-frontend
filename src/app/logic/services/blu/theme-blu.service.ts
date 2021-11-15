import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeBluService {

  private _selectedTheme: string;

  constructor(
    @Inject(DOCUMENT) private _document: Document
  ) {
  }

  public getSelectedTheme(): string {
    return this._selectedTheme;
  }

  public switchTheme(theme: string) {
    const themeLink = this._document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `${theme}.css`;
      this._selectedTheme = theme;
    }
  }
}
