import { ViewChild,Component, OnInit, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as _ from 'underscore';

import { PlayerInfoService } from './../shared/player-info.service';
import { Player } from '../shared/player.modal';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  @ViewChild('winScoreInput') winScoreInput: ElementRef;

  player: Array<Player> =  [{ name: 'Player 1'}, { name: 'Player 2'}];
  playersScore;
  poolScore;
  diceScore: number
  activePlayerId: number;
  winScore: number;
  isGameStarted: boolean;
  // Take input from module
  vsAI: boolean;
  winnerId: number;
  intervalCntrl;
  openDialog: boolean;

  constructor(
    private playerService: PlayerInfoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.onGameInit();
  }

  onGameInit() {
    this.openDialog = true;
    this.playersScore = { p0: 0, p1: 0 };
    this.poolScore = { p0: 0, p1: 0 };
    this.winScore = 0;
    this.diceScore = 5;
    this.winScoreInput.nativeElement.focus();
    this.isGameStarted = false;
    this.activePlayerId = 0;
    this.winnerId = -1;
  }

  onSetScore() {
    let winScore = this.winScoreInput.nativeElement.value;
    let condition = [0, 1].includes(this.winnerId) || winScore <= 0;
    if (condition) {
      this.snackBar.open('Press New Game to continue', '',{ duration: 2000 });
      return;
    }
    let activateGame = _.debounce(() => {
      this.winScore = winScore;
      this.isGameStarted = true;
    }, 1000);

    activateGame();
  }

  onDiceRoll() {
    this.diceScore = Math.floor(Math.random() * 6) + 1;
    //console.log('dice is rolled - Value  = ', this.diceScore);
    let { activePlayerId: id, vsAI } = this;
    if (this.diceScore === 1) {
      this.poolScore[`p${id}`] = 0;
      this.toggleActivePlayer();
    } else {
      this.poolScore[`p${id}`] += this.diceScore;
    }
  }

  onScoreHold() {
    let { poolScore, activePlayerId: id } = this;
    this.playersScore[`p${id}`] += poolScore[`p${id}`];
    this.poolScore[`p${id}`] = 0;
    if (this.isWinner()) return this.onGameEnd();
    this.toggleActivePlayer()  // Toggle between 0 and 1
  }


  isWinner() {
    let { activePlayerId: id, winScore } = this;
    if (winScore <= this.poolScore[`p${id}`] + this.playersScore[`p${id}`]) return true;
  }

  onGameEnd() {
    clearInterval(this.intervalCntrl);
    this.winnerId = this.activePlayerId;
    this.isGameStarted = false;
  }

  provideClasses(playerId: number) {
    let { isGameStarted, activePlayerId, winnerId } = this;
    if (playerId === winnerId) return "winner";
    if (playerId === activePlayerId) return "active";
  }

  toggleActivePlayer() {
    this.activePlayerId = 1 - this.activePlayerId;
    if (!this.vsAI || this.activePlayerId !== 1) {
      clearInterval(this.intervalCntrl)
      return;
    };
    //This is running means this is AI turn
    this.intervalCntrl = setInterval(() => {
      this.rollForAI();
    }, 1000)
  }

  rollForAI() {
    let shouldRoll = this.shouldRoll();
    if (shouldRoll) {
      this.onDiceRoll();
    } else {
      this.onScoreHold();
    }
  }

  shouldRoll(): boolean {
    let { winScore } = this;
    //console.log(winScore, this.playersScore, this.poolScore);
    let myMainScore = this.playersScore.p1;
    let myPoolScore = this.poolScore.p1;
    let enemyMainScore = this.poolScore.p0;

    //console.log(winScore, myMainScore, myPoolScore, enemyMainScore);
    if (myMainScore + myPoolScore >= winScore) {
      return false;
    }
    let myLead = myMainScore - enemyMainScore;
    let wantPool = (myMainScore < 80 && enemyMainScore >= 80) ? 30   // Imminent loss, be aggressive.
                 : (myMainScore >= 80 && (0 < myLead && myLead <= 10)) ? 15 // Comfortable lead
                 : 20;
                                           // General case
    return myPoolScore < wantPool;
  }

  onDialogClosed() {

    this.vsAI = false;
    this.player = [];
    this.openDialog = false;
    this.playerService.getPlayers().forEach((p) => {
      this.player.push({ name: p});
    })
    //console.log(this.player.length);
    if (this.player.length === 1) {
      this.player.push({ name: "Computer" });
      this.vsAI = true;
    }
  }


}
