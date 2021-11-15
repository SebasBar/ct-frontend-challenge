import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface User {
  id?: number;
  email: string;
}

// http headers deffinition
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class InviteService {
  private readonly url = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  //add delete option
  deleteUser(user: User): Observable<User> {
    const useUrlId = `${this.url}/${user.id}`;
    return this.http.delete<User>(useUrlId);
  }

  //invitation
  invite(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }
}
