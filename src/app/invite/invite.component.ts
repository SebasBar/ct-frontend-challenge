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
  //this variable will store the response from the server
  response: (string | object)[] = [];

  constructor(private inviteService: InviteService, private router: Router) {}

  ngOnInit(): void {
    console.log(users);
  }

  postRequest(user: User): any {
    this.inviteService.invite(user).subscribe({
      next: (response) => {
        //save success invitations
        this.response.push(response);
      },
      error: (error) => {
        //save repeated users
        if (error.status === 409) {
          this.response.push(
            `User ${user.email} already exists, error ${error.status}`
          );
          //save server error
        } else if (error.status === 500) {
          this.response.push(
            `User ${user.email} create an internal Server Error ${error.status}`
          );
        }
        //save any other error
        else
          return `There is an error number ${error.status} in the server for the user ${user.email}`;
      },
    });
  }

  inviteUsers() {
    //function to send the invitation to each user
    users.forEach((user: User) => {
      this.postRequest(user);
    });
  }

  onSubmit(): void {
    //send invitation
    this.inviteUsers();
    alert("You will be redirected to the list page");
    //redirect to /list page and send the server response variable
    this.router.navigate(["/list"], {
      state: { serverResponse: this.response },
    });
  }
}
