interface TaskInfo {
  status: string;
  failed?: number;
  failed_details?: Array<string>;
  current?: number;
  total?: number;
}

export class TaskStatus {
  taskId: string;
  taskInfo: TaskInfo;

  constructor( tId: string, obj?: any ) {
    this.taskId = tId;
    this.taskInfo = obj;
  }
}
