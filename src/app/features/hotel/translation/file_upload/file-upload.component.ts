import { Component, OnInit } from '@angular/core';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { IAlert } from '../../../../shared/utils';
import { baseConfig } from '../../../../shared/app-config';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { StatusService } from './status.service';
import { TaskStatus } from './task-status.model';

@Component({
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [AuthenticationService, StatusService]
})
export class FileUploadComponent implements OnInit {
  public message: IAlert;
  public hasDropZoneOver = false;
  public uploader: FileUploader = new FileUploader({
    url: baseConfig.baseUrl + '/api/hotels',
    method: 'post',
    allowedFileType: ['xls'],
    headers: [
      {name: 'GTA-Auth-Token', value: this.authService.getToken()}
    ]
  });
  public running_task: TaskStatus;

  ngOnInit() {
    this.uploadProcess();
  }

  constructor(private authService: AuthenticationService, private statusService: StatusService) {
    const that = this;
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      if (status !== 202) {
        that.message = {
          type: 'warning',
          message: 'failed to upload file'
        };
        return null;
      }
      let rsp =  JSON.parse(response);
      if ('task_id' in rsp) {
        that.statusService.getStatus(rsp['task_id']).subscribe(
          (data) => {
            that.uploadProcess();
          },
          (err) => {
            that.message = {
              type: 'warning',
              message: 'Failed to retrieve processing task details'
            };
            console.log(err);
          });
      }
    };
  }
  public fileOverBase(e: any): void {
    this.hasDropZoneOver = e;
  }
  closeAlert() {
    this.message = null;
  }
  uploadProcess(): void {
    const that = this;
    this.statusService.getStatusTillCompleted()
      .subscribe(
        (data) => {
          that.running_task = data;
        },
        (err) => {
          that.message = {
            type: 'warning',
            message: 'Failed to retrieve processing task details'
          };
          console.log(err);
        },
        () => {
          console.log('completed');
        }
      );
  }
}
