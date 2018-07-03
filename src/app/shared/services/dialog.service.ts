import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class DialogService {

  getDialog(msg: string): Observable<boolean> {
    const reply = window.confirm(msg);
    return Observable.of(reply);
  }

}
