import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loaderVisible = new BehaviorSubject<boolean>(false);
  loaderVisible$ = this.loaderVisible.asObservable();

  show() {
    this.loaderVisible.next(true);
  }

  hide() {
    this.loaderVisible.next(false);
  }
}
