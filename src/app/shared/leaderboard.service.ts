
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Player } from "./player.modal";

const DB_URL = "https://ng-pig-game.firebaseio.com/data.json";

const MAX_SCORE = 1000;

@Injectable()
export class LeaderboardService {

  constructor(private http: HttpClient) {}

  saveLeaderboardRecord(playerInfo:Player) {
    playerInfo.maxTurns = this.calculateMaxTurns(playerInfo);
    const req = this.http.post(DB_URL, playerInfo).subscribe();
  }

  getLeaderboardRecord() {
    return this.http.get(DB_URL);
  }

  private calculateMaxTurns(player: Player) {
    let multipleForMax = MAX_SCORE / player.winScore;
    return Math.ceil(multipleForMax * player.turns);
  }

}