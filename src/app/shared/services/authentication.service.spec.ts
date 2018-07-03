import { Observable } from 'rxjs/Observable';
import {User} from '../../features/admin/users/user.model';


interface RouteTo {
  anonymousTo: string;
  noAuthTo: string;
}
export let AuthenticationServiceStub = {
  login(email: string, password: string): Observable<any> {
    localStorage.setItem('current_user', '{"id":"59dd9a36cb80bc4b6bcd5cae","email":"test@example.com","username":"Testing Account","roles":["Admin"],"active":true,"date_created":"2017-10-13T16:51:52.000Z","date_modified":null,"last_login_at":"2017-10-12T15:25:46.000Z"}');
    localStorage.setItem('user_token', '{"authentication_token":"WyI1OWRkOWEzNmNiODBiYzRiNmJjZDVjYWUiLCIkNSRyb3VuZHM9NTM1MDAwJFllWHpUTHc4cTVGL2VBRVIkOEEucTVFZU5ObmZhUk9aTzlFWmVvcWFDZ0swQS9vcTVXRVNtbEZCZ3BkLyJd.DMhR0g.4Dsoq-0tcqIYfFBYLLOA-F6aHrs","id":"59dd9a36cb80bc4b6bcd5cae"}');
    return Observable.of('login completed');
  },
  logout (): void {
    localStorage.removeItem('current_user');
    localStorage.removeItem('user_token');
  },
  getToken (): string {
    const user_token = JSON.parse(localStorage.getItem('user_token'));
    if (user_token) {
      return user_token['authentication_token'];
    }else {
      return 'None';
    }
  },
  isLoggedin (): boolean {
    return !!localStorage.getItem('user_token');
  },
  getCurrentUser(): User|null {
    let usr = JSON.parse(localStorage.getItem('current_user'));
    if (!usr) {
      return null;
    }else {
      return new User(usr);
    }
  }
};
