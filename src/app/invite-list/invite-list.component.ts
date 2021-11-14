import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InviteService, User } from "../service/invite.service";
// removed the Observable and just used in the service

@Component({
  selector: "app-invite-list",
  templateUrl: "./invite-list.component.html",
  styleUrls: ["./invite-list.component.css"],
})
export class InviteListComponent implements OnInit {
  // change the way users$ is initialized
  users$: User[] = [];
  successEmails: any[] = [];
  failedEmails: any[] = [];

  constructor(private inviteService: InviteService, private router: Router) {
    let nav = this.router.getCurrentNavigation();

    //get object from invite component
    if (nav?.extras.state) {
      this.successEmails = nav.extras.state.serverResponse.filter(
        (elem: any) => {
          return typeof elem === "object";
        }
      );
      this.failedEmails = nav.extras.state.serverResponse.filter(
        (elem: any) => {
          return typeof elem === "string";
        }
      );
    }
  }

  // get the users list
  ngOnInit(): void {
    this.inviteService.getUsers().subscribe((users$) => (this.users$ = users$));
  }

  // Create delete to been able to have different cases to invite
  deleteUser(user: User) {
    this.inviteService
      .deleteUser(user)
      .subscribe(
        () => (this.users$ = this.users$.filter((u) => u.id !== user.id))
      );
  }
}
