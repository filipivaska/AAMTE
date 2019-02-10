import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isLoading = false;

  constructor(private http: HttpClient) { }

  public get<T>(url: string, parameter?: any, customUrl = false, showProgress = true): Observable<T> {
    let requestUrl: string;
    requestUrl = customUrl ? url : `${environment.api_url}/${url}?api_key=${environment.api_key}`;

    const promise = this.http.get<T>(requestUrl).pipe(share());
    this.setProgress(promise, showProgress);

    return promise;
  }

  private setProgress(promise: Observable<any>, showProgress: boolean) {
    if (showProgress) {
        this.isLoading = true;
        promise.subscribe(() => {
            this.isLoading = true;
        }, () => {
            this.isLoading = false;
        });
    }
}
}
