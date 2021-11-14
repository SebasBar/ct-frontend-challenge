import { Component, OnInit } from "@angular/core";
import { User, InviteService } from "../service/invite.service";
import { Router } from "@angular/router";

const users: User[] = [
  { email: "user0@comtravo.com" },
  { email: "user1@comtravo.com" },
  { email: "user2@comtravo.com" },
  { email: "user3@comtravo.com" },
  { email: "user4@comtravo.com" },
  { email: "user5@comtravo.com" },
  { email: "user6@comtravo.com" },
  { email: "user7@comtravo.com" },
  { email: "user8@comtravo.com" },
  { email: "user9@comtravo.com" },
  { email: "user10@comtravo.com" },
];

@Component({
  selector: "app-invite",
  templateUrl: "./invite.component.html",
  styleUrls: ["./invite.component.css"],
})
export class InviteComponent implements OnInit {
  response: any[] = [];

  constructor(private inviteService: InviteService, private router: Router) {}

  ngOnInit(): void {
    console.log(users);
  }

  postRequest(user: User): any {
    this.inviteService.invite(user).subscribe({
      next: (response) => {
        this.response.push(response);
      },
      error: (error) => {
        if (error.status === 409)
          this.response.push(`User ${user.email} already exists`);
        else if (error.status === 500)
          this.response.push(
            `User ${user.email} create an internal Server Error`
          );
      },
    });
  }

  inviteUsers() {
    users.forEach((user: User) => {
      this.postRequest(user);
    });
  }

  onSubmit(): void {
    this.inviteUsers();
    alert("You will be redirected to list page");
    this.router.navigate(["/list"], {
      state: { serverResponse: this.response },
    });
  }
}
