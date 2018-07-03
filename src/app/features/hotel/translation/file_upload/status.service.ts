import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TaskStatus } from './task-status.model';


@Injectable()
export class StatusService {
  constructor(
    private http: HttpClient
  ) {}

  getStatus(id?: string): Observable<any> {
    return this.http
      .get(this.getStatusUrl(id)).map( (data) => {
        if ('task_id' in data) {
          return new TaskStatus(data['task_id'], data['task_info']);
        }else {
          return null;
        }
      });
  }

  private getStatusUrl(id?): string {
    if (id) {
      return '/api/hotels/filestatus?' + 'task_id=' + id;
    }else {
      return '/api/hotels/filestatus';
    }
  }

  getStatusTillCompleted(id?: string) {
    return this.getStatus(id).delay(5000).repeatWhen( (notification) => {
      return notification;
    }).takeWhile((data) => {
        return (!!data && !!data.taskId) || (!!data && data.taskInfo.status !== 'Completed') ;
      });
  }
}

