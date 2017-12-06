import { ViewChild,Component, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  @ViewChild('finalScoreInput') finalScoreInput: ElementRef;

  playersScore: Array<number>;
  roundScore;
  diceScore: number
  activePlayer: number;
  finalScore: number;
  showDice: boolean;
  isGameActive: boolean;

  constructor() { }

  ngOnInit() {
    this.onGameInit();
  }

  onSetScore() {
    this.finalScore = this.finalScoreInput.nativeElement.value;
    this.isGameActive = true;
    this.showDice = true;
  }

  onGameInit() {
    this.playersScore = [0, 0];
    this.roundScore = { player0: 0, player1: 0 };
    this.activePlayer = 0;
    this.finalScore = 0;
    this.showDice = false;
    this.isGameActive = false;
    this.diceScore = 5;
    this.finalScoreInput.nativeElement.focus();
  }

  onDiceRoll() {
    this.diceScore = Math.floor(Math.random() * 6) + 1;
    if (this.diceScore === 1) {
      this.roundScore[`player${this.activePlayer}`] = 0;
      this.activePlayer = 1 - this.activePlayer;  // Toggle between 0 and 1
    } else {
      this.roundScore[`player${this.activePlayer}`] += this.diceScore;
    }
  }

  onScoreHold() {
    let { roundScore, activePlayer } = this;
    this.playersScore[activePlayer] = roundScore[`player${this.activePlayer}`];
    this.roundScore[`player${this.activePlayer}`] = 0;
    this.activePlayer = 1 - activePlayer;  // Toggle between 0 and 1
  }

}
