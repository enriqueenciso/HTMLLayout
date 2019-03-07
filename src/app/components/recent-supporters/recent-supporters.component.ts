import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-supporters',
  templateUrl: './recent-supporters.component.html',
  styleUrls: ['./recent-supporters.component.scss']
})
export class RecentSupportersComponent implements OnInit {

  mostRecentFollower: string;
  mostRecentSubscriber: string;
  mostRecentDonator: string;

  constructor() { }

  ngOnInit() {
    this.mostRecentFollower = 'Eeveecario';
  }

}