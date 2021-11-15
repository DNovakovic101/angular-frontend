import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class AbstractApiService {
  constructor(
    protected httpClient: HttpClient,
    protected apiEndpoint: string
  ) {
    this.apiEndpoint = `${environment.apiUrl}${apiEndpoint}`;
  }
}
