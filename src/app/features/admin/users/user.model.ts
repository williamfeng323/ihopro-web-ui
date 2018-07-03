import { initialDate } from '../../../shared/utils';

export class User {
  id: string;
  email: string;
  username: string;
  password: string;
  roles: Array<any>;
  active: boolean;
  date_created: Date|void;
  date_modified: Date|void;
  last_login_at: Date|void;

  constructor( obj?: any ) {
    this.id = obj && obj.id;
    this.email = obj && obj.email;
    this.username = obj && obj.username;
    this.password = obj && obj.password;
    this.roles = obj && obj.roles;
    this.active = obj && obj.active;
    this.date_created = initialDate(obj && obj.date_created);
    this.date_modified = initialDate(obj && obj.date_modified);
    this.last_login_at = initialDate(obj && obj.last_login_at);
  }
}
