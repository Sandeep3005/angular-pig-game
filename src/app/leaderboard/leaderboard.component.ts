import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './../shared/leaderboard.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  playersData = [];

  constructor(private lb: LeaderboardService) { }

  ngOnInit() {
    let req = this.lb.getLeaderboardRecord();
    req.subscribe((data) => {
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++ ) {
        this.playersData.push(data[keys[i]])
      }
      _.sortBy(this.playersData, 'maxTurns');
      //this.lb.calculateRank(this.playersData)
      console.log(this.playersData);
    });
  }
}
